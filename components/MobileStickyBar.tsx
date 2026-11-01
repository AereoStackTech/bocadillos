'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface MobileStickyBarProps {
  lang: Language;
  trayCount: number;
  trayTotal: number;
  onOpenTray: () => void;
}

export function MobileStickyBar({
  lang,
  trayCount,
  trayTotal,
  onOpenTray,
}: MobileStickyBarProps) {
  const t = UI_TRANSLATIONS[lang];

  if (trayCount === 0) return null;

  return (
    <aside
      aria-label="Panier rapide mobile"
      className="md:hidden fixed bottom-3 left-3 right-3 z-30"
    >
      <div className="bg-stone-900/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-2.5 shadow-2xl shadow-black/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs shadow-md">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-stone-400">
              {trayCount} article{trayCount > 1 ? 's' : ''} au plateau
            </div>
            <div className="text-sm font-extrabold text-amber-400 font-mono tabular-nums leading-tight">
              {trayTotal} {t.mad}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenTray}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md active:scale-95"
        >
          <span>Commander</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
