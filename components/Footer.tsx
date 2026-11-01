'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = UI_TRANSLATIONS[lang];

  return (
    <footer className="bg-stone-950 border-t border-stone-800/80 pt-12 pb-16 text-xs text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-stone-100 font-display">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950">
                <Flame className="w-4 h-4 fill-stone-950" />
              </div>
              <span>
                Bocadillos <span className="text-amber-500">Express & Grill</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              Votre snack de quartier à Safi, réputé pour ses bocadillos généreux, ses tacos dorés à la sauce fromagère onctueuse, et ses grillades saisies minute sur la plancha.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <span>Safi, Maroc</span>
              <span aria-hidden="true">·</span>
              <span>14:00 – 02:00</span>
              <span aria-hidden="true">·</span>
              <span>1 à 50 MAD</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Navigation
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  {t.navMenu}
                </a>
              </li>
              <li>
                <a href="#offres" className="hover:text-amber-400 transition-colors">
                  {t.navDeals}
                </a>
              </li>
              <li>
                <a href="#localisation" className="hover:text-amber-400 transition-colors">
                  {t.navLocation}
                </a>
              </li>
              <li>
                <a href="#horaires" className="hover:text-amber-400 transition-colors">
                  {t.navHours}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <div className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Contact & Retrait
            </div>
            <p className="text-stone-300 font-medium">Avenue Hassan II, Plateau, Safi</p>
            <p className="font-mono text-amber-400">05 24 62 18 90</p>
            <p className="text-[11px] text-stone-500">
              Commandes WhatsApp & Retrait au comptoir sans file d&apos;attente.
            </p>
          </div>
        </div>

        {/* Required Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 text-[11px] text-stone-400 leading-relaxed space-y-1">
          <div className="font-semibold text-amber-500 uppercase tracking-wider text-[10px]">
            Independent Portfolio Concept · Mentions Légales
          </div>
          <p>
            This website is an independent portfolio concept inspired by the vibrant neighborhood fast-food and snack culture in Safi, Morocco. It is not affiliated with, commissioned by, endorsed by, or connected to any real business or trademarked franchise. All menu items, pricing, and references are created for demonstration and portfolio showcasing purposes.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-4 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Bocadillos Express & Grill — Safi, Maroc. Tous droits réservés.
          </div>
          <div className="flex items-center gap-1">
            <span>Fait avec passion pour la gastronomie urbaine marocaine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
