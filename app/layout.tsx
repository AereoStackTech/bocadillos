import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bocadillos Express & Grill — Snack & Tacos à Safi, Maroc',
  description:
    'Snack de quartier moderne à Safi : Bocadillos chargés, tacos fondants, frites croustillantes, plats grillés et zâazâa rafraîchissant. Retrait rapide au comptoir.',
  keywords: [
    'Bocadillos Safi',
    'Tacos Safi',
    'Snack Safi',
    'Fast food Safi Maroc',
    'Zâazâa Safi',
    'Sandwich Safi',
    'Takeaway Safi',
  ],
  openGraph: {
    title: 'Bocadillos Express & Grill — Snack & Tacos à Safi',
    description:
      'Snack de quartier moderne à Safi : Bocadillos croustillants, tacos généreux, plats grillés et boissons fraîches entre 1 et 50 MAD.',
    type: 'website',
    locale: 'fr_MA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bocadillos Express & Grill — Snack & Tacos à Safi',
    description:
      'Snack de quartier moderne à Safi : Bocadillos croustillants, tacos généreux, plats grillés et boissons fraîches entre 1 et 50 MAD.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-stone-950 text-stone-100 antialiased font-sans selection:bg-amber-500 selection:text-stone-950 min-h-screen">
        {children}
      </body>
    </html>
  );
}
