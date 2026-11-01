'use client';

import React, { useState } from 'react';
import { Flame, Clock, MapPin, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface HeroProps {
  lang: Language;
  onOpenTray: () => void;
}

export function Hero({ lang, onOpenTray }: HeroProps) {
  const t = UI_TRANSLATIONS[lang];
  const [isOpenNow] = useState(() => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 14 || currentHour < 2;
  });

  return (
    <section id="top" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-orange-600/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-800/80 mb-8 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Safi · Bd Hassan II (Quartier Plateau)</span>
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="hidden sm:inline font-mono">14:00 – 02:00</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${
                isOpenNow
                  ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-400'
                  : 'bg-amber-950/40 border-amber-800/50 text-amber-400'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{isOpenNow ? t.statusOpen : t.statusClosed}</span>
            </span>
          </div>
        </div>

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Column 1: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                {t.heroTag}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-100 font-display leading-[1.15] text-balance">
                Bocadillos Chargés, Tacos Croustillants & Grillades
              </h1>
              <p className="text-base sm:text-lg text-stone-400 leading-relaxed max-w-2xl">
                {t.heroSubtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>{t.btnExploreMenu}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenTray}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 font-semibold text-sm transition-all active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{t.btnFastPickup}</span>
              </button>
            </div>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800/80">
              <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/60">
                <div className="text-xs text-stone-400">Temps de cuisson</div>
                <div className="text-sm font-bold text-stone-200 font-mono mt-0.5">8 - 12 minutes</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/60">
                <div className="text-xs text-stone-400">Fourchette de prix</div>
                <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">1 à 50 MAD</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-stone-900/60 border border-stone-800/60">
                <div className="text-xs text-stone-400">Préparation</div>
                <div className="text-sm font-bold text-stone-200 mt-0.5">100% Viande Fraîche</div>
              </div>
            </div>
          </div>

          {/* Column 2: Graphic Showcase Artifact */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 shadow-2xl p-6 sm:p-7">
              {/* Decorative radial ember behind */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header inside graphic box */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs text-stone-400">
                <span className="font-semibold text-stone-200">Spécialité du Chef · Safi</span>
                <span className="font-mono text-amber-400 font-bold">28 MAD</span>
              </div>

              {/* Visual culinary illustration container */}
              <div className="relative my-5 rounded-2xl h-56 sm:h-64 bg-gradient-to-br from-amber-950/40 via-orange-950/30 to-stone-900 flex flex-col items-center justify-center p-6 border border-amber-900/30 overflow-hidden text-center">
                {/* Background geometric flare */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)]" />

                {/* Sizzling Icon & Title */}
                <div className="relative z-10 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/25">
                    <Flame className="w-8 h-8 text-stone-950" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-stone-100 font-display">
                      Bocadillo Spécial Express
                    </h3>
                    <p className="text-xs text-amber-300 font-medium mt-1">
                      Poulet Mariné · Kefta Grillée · Frites & Double Sauce
                    </p>
                  </div>
                </div>

                {/* Badges strip inside visual */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-400 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800">
                  <span>Prêt en 9 min</span>
                  <span className="text-amber-400 font-bold">Baguette Croustillante</span>
                  <span>100% Halal</span>
                </div>
              </div>

              {/* Bottom Quick Perks */}
              <div className="space-y-2 text-xs text-stone-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Sauce Fromagère maison cuisinée chaque matin</span>
                  </span>
                  <span className="font-mono text-stone-500">Inclus</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Frites fraîches croustillantes avec sel de Safi</span>
                  </span>
                  <span className="font-mono text-stone-500">Inclus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
