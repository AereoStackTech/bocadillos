'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, X, Copy, Check, MessageSquare } from 'lucide-react';
import { PickupOrderResponse } from '@/app/actions/order';
import { Language, UI_TRANSLATIONS } from '@/lib/translations';

interface OrderTicketModalProps {
  orderData: {
    result: PickupOrderResponse;
    customerName: string;
    pickupTime: string;
  } | null;
  lang: Language;
  onClose: () => void;
}

export function OrderTicketModal({ orderData, lang, onClose }: OrderTicketModalProps) {
  const t = UI_TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!orderData || !orderData.result.success) return null;

  const orderId = orderData.result.orderId || 'SAF-2026';

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden p-6 text-center space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Header */}
        <div className="space-y-1">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            {t.orderSuccessTitle}
          </div>
          <h3 className="text-2xl font-black text-stone-100 font-display">
            Merci {orderData.customerName} !
          </h3>
          <p className="text-xs text-stone-400">
            Votre commande a été transmise directement aux grillardins à Safi.
          </p>
        </div>

        {/* Ticket Digital Card */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs text-stone-400">
            <span>{t.ticketNumber}</span>
            <button
              type="button"
              onClick={copyOrderId}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-[11px] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
          </div>

          <div className="text-center py-2">
            <div className="text-3xl font-extrabold text-amber-400 tracking-wider">
              #{orderId}
            </div>
            <div className="text-[11px] text-stone-400 font-sans mt-1">
              {t.pickupReadyAt} : <span className="text-stone-200 font-semibold">{orderData.pickupTime}</span>
            </div>
          </div>

          {/* Kitchen progress simulation */}
          <div className="pt-2 border-t border-stone-800 text-[11px] font-sans space-y-2 text-stone-400">
            <div className="flex items-center justify-between">
              <span>Statut :</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Cuisson sur la plancha
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Compte à rebours estimé :</span>
              <span className="text-stone-200 font-bold font-mono">~{countdownMinutes} min</span>
            </div>
          </div>
        </div>

        {/* Address and Counter Instructions */}
        <div className="text-xs text-stone-400 space-y-2 text-left bg-stone-900/60 p-3.5 rounded-xl border border-stone-800/60">
          <div className="flex items-start gap-2 text-stone-300">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-100">Lieu de retrait : </span>
              Avenue Hassan II, Quartier Plateau, Safi.
            </div>
          </div>
          <p className="text-[11px] text-stone-500 pl-6">
            Présentez simplement le code <strong className="text-stone-300">#{orderId}</strong> au comptoir pour régler et récupérer votre commande prête et chaude.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <a
            href={`https://wa.me/212624621890?text=${encodeURIComponent(
              `Salam ! Je suis ${orderData.customerName}, j'ai passé la commande #${orderId} pour retrait (${orderData.pickupTime}). Merci !`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Suivre sur WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
