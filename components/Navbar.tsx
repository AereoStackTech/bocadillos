'use client';

import React from 'react';
import { Flame, ShoppingBag, Globe, PhoneCall } from 'lucide-react';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  trayCount: number;
  trayTotal: number;
  onOpenTray: () => void;
}

export function Navbar({
  lang,
  onLanguageChange,
  trayCount,
  trayTotal,
  onOpenTray,
}: NavbarProps) {
  const t = UI_TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single text element with icon) */}
        <a
          href="#top"
          className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-stone-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 shadow-md shadow-orange-500/20">
            <Flame className="w-5 h-5 fill-stone-950 stroke-stone-950" />
          </div>
          <span className="font-display">
            Bocadillos <span className="text-amber-500">Express</span>
          </span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a
            href="#menu"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navMenu}
          </a>
          <a
            href="#offres"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navDeals}
          </a>
          <a
            href="#pickup"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navPickup}
          </a>
          <a
            href="#localisation"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navLocation}
          </a>
          <a
            href="#horaires"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.navHours}
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Language Switch */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language selector toggle */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5 text-xs font-medium text-stone-400">
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'fr'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'hover:text-stone-200'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'ar'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'hover:text-stone-200'
              }`}
              title="العربية"
            >
              عربي
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en'
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'hover:text-stone-200'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Quick Call Button (Desktop) */}
          <a
            href="tel:+212524621890"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl transition-colors whitespace-nowrap"
            title="Appeler le snack"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span className="tabular-nums font-mono text-stone-200">05 24 62 18 90</span>
          </a>

          {/* Primary Action Button: Tray Trigger */}
          <button
            type="button"
            onClick={onOpenTray}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.ctaTray}</span>
            {trayCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-stone-950 text-amber-400 text-xs font-mono font-bold tabular-nums">
                {trayCount} · {trayTotal} {t.mad}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
