'use client';

import React from 'react';
import { Plus, Clock, Flame, Sparkles, Layers, Utensils, Coffee, Droplet, Fish } from 'lucide-react';
import { MenuItem } from '@/data/menu';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface MenuCardProps {
  item: MenuItem;
  lang: Language;
  onQuickAdd: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
}

export function MenuCard({ item, lang, onQuickAdd, onCustomize }: MenuCardProps) {
  const t = UI_TRANSLATIONS[lang];

  const itemName = lang === 'ar' ? item.nameAr : lang === 'en' ? item.nameEn : item.name;
  const secondaryName = lang === 'ar' ? item.name : item.nameAr;
  const itemDesc = lang === 'ar' ? item.descriptionAr : lang === 'en' ? item.descriptionEn : item.description;

  const renderIcon = () => {
    switch (item.iconName) {
      case 'Sandwich':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-emerald-400" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-cyan-400" />;
      case 'Fish':
        return <Fish className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="group rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-black/30">
      <div>
        {/* Top visual graphic strip */}
        <div className={`relative h-28 rounded-xl bg-gradient-to-br ${item.gradient} p-3 flex flex-col justify-between overflow-hidden`}>
          {/* Subtle noise/pattern overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="p-2 rounded-lg bg-stone-950/60 backdrop-blur-md">
              {renderIcon()}
            </span>

            {item.isChefSpecial && (
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 text-[10px] font-bold tracking-tight uppercase">
                Spécialité
              </span>
            )}
            {!item.isChefSpecial && item.isPopular && (
              <span className="px-2 py-0.5 rounded-md bg-stone-950/80 text-amber-400 text-[10px] font-semibold border border-stone-800">
                Populaire
              </span>
            )}
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-200">
            <span className="flex items-center gap-1 font-mono font-medium bg-stone-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{item.prepTime}</span>
            </span>
            {item.calories && (
              <span className="text-[10px] text-stone-300 font-mono bg-stone-950/60 px-1.5 py-0.5 rounded">
                ~{item.calories} kcal
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="pt-3.5 pb-2 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors font-display leading-snug">
                {itemName}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium font-arabic mt-0.5">
                {secondaryName}
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
            {itemDesc}
          </p>
        </div>
      </div>

      {/* Footer / Price & Actions */}
      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
        <div>
          <span className="text-lg font-extrabold text-amber-400 font-mono tabular-nums">
            {item.price}
          </span>
          <span className="text-xs text-stone-400 ml-1">{t.mad}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onCustomize(item)}
            className="px-2.5 py-1.5 text-xs font-medium text-stone-300 hover:text-stone-100 bg-stone-800/80 hover:bg-stone-700/80 rounded-lg transition-colors"
          >
            {t.customize}
          </button>
          <button
            type="button"
            onClick={() => onQuickAdd(item)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition-colors active:scale-95"
            title={t.addToTray}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">{t.addToTray}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
