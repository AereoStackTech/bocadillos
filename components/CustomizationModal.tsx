'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, SAUCES_AVAILABLE } from '@/data/menu';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

export interface CustomizedOrderItem {
  item: MenuItem;
  quantity: number;
  selectedSauces: string[];
  extraCheese: boolean;
  extraEgg: boolean;
  specialNotes: string;
  totalPrice: number;
}

interface CustomizationModalProps {
  item: MenuItem | null;
  lang: Language;
  onClose: () => void;
  onConfirm: (customizedItem: CustomizedOrderItem) => void;
}

function ModalInner({
  item,
  lang,
  onClose,
  onConfirm,
}: {
  item: MenuItem;
  lang: Language;
  onClose: () => void;
  onConfirm: (customizedItem: CustomizedOrderItem) => void;
}) {
  const t = UI_TRANSLATIONS[lang];

  const [quantity, setQuantity] = useState(1);
  const [selectedSauces, setSelectedSauces] = useState<string[]>(
    item.category === 'boissons' ? [] : ['sauce_fromagere']
  );
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraEgg, setExtraEgg] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');

  const itemName = lang === 'ar' ? item.nameAr : lang === 'en' ? item.nameEn : item.name;
  const isFood = item.category !== 'boissons';

  const basePrice = item.price;
  const extrasCost = (extraCheese ? 3 : 0) + (extraEgg ? 2 : 0);
  const unitPrice = basePrice + extrasCost;
  const calculatedTotal = unitPrice * quantity;

  const toggleSauce = (sauceId: string) => {
    if (selectedSauces.includes(sauceId)) {
      setSelectedSauces(selectedSauces.filter((id) => id !== sauceId));
    } else {
      setSelectedSauces([...selectedSauces, sauceId]);
    }
  };

  const handleAdd = () => {
    onConfirm({
      item,
      quantity,
      selectedSauces,
      extraCheese,
      extraEgg,
      specialNotes,
      totalPrice: calculatedTotal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono font-medium text-amber-500 uppercase tracking-wider">
              Personnalisation
            </div>
            <h3 className="text-xl font-bold text-stone-100 font-display mt-0.5">
              {itemName}
            </h3>
            <p className="text-xs text-stone-400 mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Options Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Quantity selector */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
            <span className="font-semibold text-stone-200">Quantité</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono font-bold text-base text-amber-400 tabular-nums w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sauces choices if food item */}
          {isFood && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-bold text-stone-200 uppercase tracking-wide">
                  Sauces incluses au choix
                </span>
                <span>(Sélection multiple)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SAUCES_AVAILABLE.map((sauce) => {
                  const isChecked = selectedSauces.includes(sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => toggleSauce(sauce.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className="truncate mr-2">{sauce.name}</span>
                      <span
                        className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                          isChecked
                            ? 'bg-amber-500 border-amber-500 text-stone-950'
                            : 'border-stone-700 bg-stone-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras / Supplements */}
          {isFood && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-stone-200 uppercase tracking-wide">
                Suppléments gourmands
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setExtraCheese(!extraCheese)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    extraCheese
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-stone-200">Extra Cheddar Fondu</div>
                    <div className="text-[11px] font-mono text-amber-400">+3 MAD</div>
                  </div>
                  <span
                    className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                      extraCheese
                        ? 'bg-amber-500 border-amber-500 text-stone-950'
                        : 'border-stone-700 bg-stone-900'
                    }`}
                  >
                    {extraCheese && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setExtraEgg(!extraEgg)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    extraEgg
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-stone-200">Extra Œuf au Plat</div>
                    <div className="text-[11px] font-mono text-amber-400">+2 MAD</div>
                  </div>
                  <span
                    className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                      extraEgg
                        ? 'bg-amber-500 border-amber-500 text-stone-950'
                        : 'border-stone-700 bg-stone-900'
                    }`}
                  >
                    {extraEgg && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Kitchen instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-300">
              {t.notesLabel}
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="ex: Frites bien dorées, sans oignon, sauce à part..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-stone-400 uppercase tracking-wide">Total article</div>
            <div className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
              {calculatedTotal} <span className="text-xs text-stone-400 font-normal">{t.mad}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Ajouter au Plateau</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function CustomizationModal({
  item,
  lang,
  onClose,
  onConfirm,
}: CustomizationModalProps) {
  if (!item) return null;
  return (
    <ModalInner
      key={item.id}
      item={item}
      lang={lang}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
