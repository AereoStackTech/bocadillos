'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, CheckCircle2, Clock, Phone, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { CustomizedOrderItem } from './CustomizationModal';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';
import { submitPickupOrder, PickupOrderResponse } from '@/app/actions/order';

interface PickupDrawerProps {
  isOpen: boolean;
  lang: Language;
  trayItems: CustomizedOrderItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearTray: () => void;
  onOrderSuccess: (result: PickupOrderResponse, customerName: string, pickupTime: string) => void;
}

export function PickupDrawer({
  isOpen,
  lang,
  trayItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
  onOrderSuccess,
}: PickupDrawerProps) {
  const t = UI_TRANSLATIONS[lang];

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('Dans 15-20 minutes');
  const [generalNotes, setGeneralNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalSum = trayItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Generate WhatsApp formatted message
  const handleWhatsAppOrder = () => {
    if (trayItems.length === 0) {
      setFormError('Votre plateau est vide.');
      return;
    }
    if (!customerName.trim()) {
      setFormError('Veuillez indiquer votre prénom pour la commande.');
      return;
    }

    setFormError(null);

    const itemsText = trayItems
      .map((it) => {
        const sauces = it.selectedSauces.length > 0 ? ` (Sauce: ${it.selectedSauces.join(', ')})` : '';
        const notes = it.specialNotes ? ` [Note: ${it.specialNotes}]` : '';
        return `• ${it.quantity}x ${it.item.name}${sauces}${notes} - ${it.totalPrice} MAD`;
      })
      .join('\n');

    const message = `Salam Bocadillos Express Safi ! 👋
Je souhaite passer une commande pour RETRAIT RAPIDE (Takeaway) :

📋 *MA COMMANDE :*
${itemsText}

💰 *TOTAL :* ${totalSum} MAD
👤 *NOM :* ${customerName}
📞 *TÉL :* ${customerPhone || 'Direct'}
⏰ *HEURE DE RETRAIT SOUHAITÉE :* ${pickupTime}
${generalNotes ? `📝 *REMARQUE :* ${generalNotes}\n` : ''}
Merci de me confirmer la préparation au comptoir !`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212624621890?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Submit via Server Action
  const handleServerActionOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (trayItems.length === 0) {
      setFormError('Votre plateau est vide.');
      return;
    }

    if (!customerName.trim() || customerName.trim().length < 2) {
      setFormError('Veuillez indiquer votre prénom / nom pour le retrait.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setFormError('Veuillez renseigner un numéro de téléphone valide.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName,
        customerPhone,
        pickupTime,
        notes: generalNotes,
        totalMAD: totalSum,
        items: trayItems.map((it) => ({
          id: it.item.id,
          name: it.item.name,
          price: it.totalPrice,
          quantity: it.quantity,
          sauce: it.selectedSauces.join(', '),
          notes: it.specialNotes,
        })),
      };

      const result = await submitPickupOrder(payload);

      if (result.success) {
        onOrderSuccess(result, customerName, pickupTime);
        onClearTray();
        onClose();
      } else {
        setFormError(result.error || 'Erreur lors de la validation du plateau.');
      }
    } catch (err) {
      setFormError('Impossible de transmettre la commande. Réessayez ou utilisez WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-100 font-display">
                  {t.yourTray}
                </h3>
                <p className="text-[11px] text-stone-400">
                  {trayItems.length} article{trayItems.length > 1 ? 's' : ''} sélectionné{trayItems.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tray Scrollable Content */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-6">
            {trayItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center mx-auto text-stone-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-stone-300">
                  {t.emptyTray}
                </div>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  {t.emptyTrayHint}
                </p>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  {trayItems.map((item, idx) => (
                    <div
                      key={`${item.item.id}-${idx}`}
                      className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-100 font-display">
                            {item.item.name}
                          </h4>
                          {item.selectedSauces.length > 0 && (
                            <p className="text-[10px] text-stone-400 mt-0.5">
                              Sauce: {item.selectedSauces.join(', ')}
                            </p>
                          )}
                          {(item.extraCheese || item.extraEgg) && (
                            <p className="text-[10px] text-amber-400 mt-0.5 font-medium">
                              Extra: {item.extraCheese ? 'Cheddar ' : ''}
                              {item.extraEgg ? 'Œuf' : ''}
                            </p>
                          )}
                          {item.specialNotes && (
                            <p className="text-[10px] text-stone-500 italic mt-0.5">
                              Note: {item.specialNotes}
                            </p>
                          )}
                        </div>

                        <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                          {item.totalPrice} {t.mad}
                        </span>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-900 text-xs">
                        <div className="flex items-center gap-2 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="text-stone-400 hover:text-stone-200"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-bold text-amber-400 tabular-nums px-1">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="text-stone-400 hover:text-stone-200"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(idx)}
                          className="text-[11px] text-stone-500 hover:text-red-400 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pre-order form info */}
                <form id="pickup-form" onSubmit={handleServerActionOrder} className="space-y-4 pt-3 border-t border-stone-800">
                  <div className="text-xs font-bold text-stone-200 uppercase tracking-wide flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Détails du Retrait au Comptoir</span>
                  </div>

                  {/* Customer Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                      <User className="w-3 h-3 text-stone-400" />
                      <span>{t.nameLabel} *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-stone-400" />
                      <span>{t.phoneLabel} *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  {/* Desired Pickup Time */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-300">
                      {t.pickupTimeLabel}
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Dans 15-20 minutes">{t.asap15}</option>
                      <option value="Dans 30 minutes">{t.in30}</option>
                      <option value="Dans 45 minutes">{t.in45}</option>
                      <option value="Ce soir à 20h00">{t.eveningRush}</option>
                      <option value="Ce soir à 21h30">Ce soir à 21h30</option>
                    </select>
                  </div>

                  {/* General notes */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-300">
                      Remarques pour la cuisine
                    </label>
                    <input
                      type="text"
                      value={generalNotes}
                      onChange={(e) => setGeneralNotes(e.target.value)}
                      placeholder="ex: Pain bien toasté, servi bien chaud..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs">
                      {formError}
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer Actions */}
          {trayItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-stone-300">{t.total}</span>
                <span className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                  {totalSum} <span className="text-xs text-stone-400 font-normal">{t.mad}</span>
                </span>
              </div>

              {/* Action 1: Instant WhatsApp Bridge */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-98 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white stroke-none" />
                <span>{t.btnSubmitWhatsApp}</span>
              </button>

              {/* Action 2: Server-side Ticket Submission */}
              <button
                type="submit"
                form="pickup-form"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmission en cours...' : t.btnSubmitWeb}</span>
              </button>

              <p className="text-[10px] text-center text-stone-500">
                Paiement sur place au comptoir (Espèces) lors du retrait à Safi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
