'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS, MenuItem } from '@/data/menu';
import { MenuCard } from './MenuCard';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface MenuSectionProps {
  lang: Language;
  onQuickAdd: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
}

export function MenuSection({ lang, onQuickAdd, onCustomize }: MenuSectionProps) {
  const t = UI_TRANSLATIONS[lang];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [meatFilter, setMeatFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Meat filter match
      if (meatFilter !== 'all') {
        if (meatFilter === 'chicken' && item.meatType !== 'chicken') return false;
        if (meatFilter === 'beef' && item.meatType !== 'beef') return false;
        if (meatFilter === 'mix' && item.meatType !== 'mix') return false;
        if (meatFilter === 'fish' && item.meatType !== 'fish') return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesNameAr = item.nameAr.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesName || matchesNameAr || matchesDesc || matchesCategory;
      }

      return true;
    });
  }, [activeCategory, meatFilter, searchQuery]);

  return (
    <section id="menu" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              Carte Complète · Tarifs 1 à 50 MAD
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-display">
              {t.navMenu}
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menuSearchPlaceholder}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-8 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar (Segmented Interactive Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const label = lang === 'ar' ? cat.labelAr : lang === 'en' ? cat.labelEn : cat.labelFr;
            const count = cat.id === 'all'
              ? MENU_ITEMS.length
              : MENU_ITEMS.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dietary / Protein secondary filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
          <span className="flex items-center gap-1 font-semibold text-stone-300 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-500" />
            <span>Viande :</span>
          </span>
          {[
            { id: 'all', label: t.filterAll },
            { id: 'chicken', label: t.filterChicken },
            { id: 'beef', label: t.filterBeef },
            { id: 'mix', label: t.filterMix },
            { id: 'fish', label: t.filterFish },
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setMeatFilter(flt.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                meatFilter === flt.id
                  ? 'bg-stone-800 text-amber-400 font-semibold border border-stone-700'
                  : 'hover:text-stone-200'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                lang={lang}
                onQuickAdd={onQuickAdd}
                onCustomize={onCustomize}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-stone-900/40 border border-stone-800 p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-stone-200">
              Aucun résultat pour cette recherche
            </h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Essayez un autre mot clé comme « Tacos », « Kefta », « Zâazâa » ou réinitialisez les filtres.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setMeatFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-stone-800 text-stone-200 hover:bg-stone-700 rounded-lg transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
