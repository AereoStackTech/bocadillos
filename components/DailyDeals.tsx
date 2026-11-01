'use client';

import React from 'react';
import { Package, Plus, Sparkles, Clock, Flame } from 'lucide-react';
import { MenuItem } from '@/data/menu';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface DailyDealsProps {
  lang: Language;
  deals: MenuItem[];
  onQuickAdd: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
}

export function DailyDeals({ lang, deals, onQuickAdd, onCustomize }: DailyDealsProps) {
  const t = UI_TRANSLATIONS[lang];

  return (
    <section id="offres" className="py-10 bg-stone-900/40 border-y border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.dealsTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 font-display">
              Nos Combos & Formules Vedettes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md">
            {t.dealsSubtitle}
          </p>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((item) => {
            const itemName = lang === 'ar' ? item.nameAr : lang === 'en' ? item.nameEn : item.name;
            const itemDesc = lang === 'ar' ? item.descriptionAr : lang === 'en' ? item.descriptionEn : item.description;

            return (
              <div
                key={item.id}
                className="relative rounded-2xl bg-stone-900/90 border border-stone-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-lg shadow-black/20"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-amber-400">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Best-Seller</span>
                  </span>
                  <span className="flex items-center gap-1 text-stone-400 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.prepTime}</span>
                  </span>
                </div>

                {/* Card Body */}
                <div className="py-4 space-y-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base sm:text-lg font-bold text-stone-100 font-display">
                      {itemName}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                    {itemDesc}
                  </p>
                </div>

                {/* Card Footer: Price & Fast Actions */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase tracking-wide">Prix complet</div>
                    <div className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                      {item.price} <span className="text-xs text-stone-400 font-normal">{t.mad}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onCustomize(item)}
                      className="px-3 py-2 text-xs font-semibold text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors"
                      title={t.customize}
                    >
                      {t.customize}
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAdd(item)}
                      className="px-3.5 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{t.addToTray}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
