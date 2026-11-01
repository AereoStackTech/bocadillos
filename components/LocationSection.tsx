'use client';

import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, Navigation, Star } from 'lucide-react';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface LocationSectionProps {
  lang: Language;
}

export function LocationSection({ lang }: LocationSectionProps) {
  const t = UI_TRANSLATIONS[lang];

  const landmarks = [
    { name: 'ENSA & Faculté Polydisciplinaire de Safi', distance: '5 min' },
    { name: 'Lycée Hassan II & Cité Scolaire Plateau', distance: '3 min' },
    { name: 'Château de Mer & Médina de Safi', distance: '7 min' },
    { name: 'Corniche Sidi Bouzid', distance: '10 min' },
  ];

  const reviews = [
    {
      author: 'Youssef B. (Étudiant ENSA)',
      comment:
        'Le Combo Étudiant à 30 DH nous sauve pendant les révisions du soir. Le bocadillo poulet mariné avec la sauce fromagère est toujours servi ultra chaud.',
      rating: 5,
    },
    {
      author: 'Amina K. (Résidente Plateau)',
      comment:
        'Le pré-ordre WhatsApp est génial : je commande en sortant du travail, et quand j’arrive au snack mon plateau de tacos L est prêt sans faire la queue !',
      rating: 5,
    },
    {
      author: 'Karim M.',
      comment:
        'Le Zâazâa royal aux amandes et avocat est le meilleur de tout Safi. Des portions copieuses et des prix vraiment accessibles entre 10 et 40 DH.',
      rating: 5,
    },
  ];

  return (
    <section id="localisation" className="py-12 sm:py-16 bg-stone-900/60 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
            {t.locationTitle}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 font-display">
            Au Cœur du Plateau à Safi
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            {t.locationSubtitle}
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Card 1: Address */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                  <MapPin className="w-4 h-4" />
                  <span>{t.addressLabel}</span>
                </div>
                <div className="text-sm font-semibold text-stone-100">
                  {t.addressVal}
                </div>
                <p className="text-xs text-stone-400">
                  En plein quartier vivant du Plateau, à deux pas des commerces et des arrêts de bus.
                </p>
              </div>

              {/* Card 2: Operating Hours */}
              <div id="horaires" className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                  <Clock className="w-4 h-4" />
                  <span>{t.hoursLabel}</span>
                </div>
                <div className="text-sm font-semibold text-stone-100">
                  {t.hoursVal}
                </div>
                <p className="text-xs text-stone-400">
                  Grill ouvert en continu de 14h00 jusqu&apos;à 02h00 pour vos envies de l&apos;après-midi et de fin de soirée.
                </p>
              </div>

              {/* Card 3: Direct Contact */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                    <Phone className="w-4 h-4" />
                    <span>Contact Direct</span>
                  </div>
                  <span className="text-xs font-mono text-stone-300 font-bold">{t.phoneVal}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:+212524621890"
                    className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Appeler</span>
                  </a>
                  <a
                    href="https://wa.me/212624621890?text=Salam%20Bocadillos%20Express%20Safi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Proximity landmarks */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 text-xs text-stone-400 space-y-2">
              <div className="font-semibold text-stone-300 text-[11px] uppercase tracking-wide">
                À proximité immédiate :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {landmarks.map((lm, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-stone-900/60">
                    <span className="truncate mr-2 text-stone-300">{lm.name}</span>
                    <span className="font-mono text-amber-400 font-bold shrink-0">{lm.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Visual Map Card */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="h-full min-h-[340px] rounded-3xl bg-stone-900 border border-stone-800 p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Map stylized background with compass and grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              
              {/* Stylized streets visual representation */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <Navigation className="w-4 h-4 text-amber-400" />
                    <span>Plan Repère · Ville de Safi (Maroc)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-stone-950 text-amber-400 text-[11px] font-mono border border-stone-800">
                    32.2994° N, 9.2372° W
                  </span>
                </div>

                {/* Visual landmark nodes */}
                <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-5 my-3 relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold font-mono shadow-lg shadow-amber-500/20">
                      ★
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-100">
                        Bocadillos Express & Grill
                      </div>
                      <div className="text-xs text-amber-400 font-mono">
                        Avenue Hassan II · Comptoir Takeaway
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-stone-800">
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="text-stone-400 text-[10px]">Accès Étudiant</div>
                      <div className="text-stone-200 font-semibold mt-0.5">Campus ENSA Safi</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="text-stone-400 text-[10px]">Parking</div>
                      <div className="text-stone-200 font-semibold mt-0.5">Arrêt Minute Facile</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="text-stone-400 text-[10px]">Service</div>
                      <div className="text-stone-200 font-semibold mt-0.5">Sur Place & Emporter</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Maps Action */}
              <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-stone-800">
                <span className="text-stone-400 text-center sm:text-left">
                  Préparez votre itinéraire GPS vers notre snack à Safi :
                </span>
                <a
                  href="https://maps.google.com/?q=Safi+Plateau+Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Ouvrir dans Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Local Testimonials / Avis du Quartier */}
        <div className="pt-6 border-t border-stone-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-100 font-display">
              Avis des Habitués & Étudiants de Safi
            </h3>
            <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5 sur le quartier</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((rev, i) => (
              <div key={i} className="p-4 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-200">{rev.author}</span>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed italic">
                  « {rev.comment} »
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
