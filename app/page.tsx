'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { DailyDeals } from '@/components/DailyDeals';
import { MenuSection } from '@/components/MenuSection';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/Footer';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { CustomizationModal, CustomizedOrderItem } from '@/components/CustomizationModal';
import { PickupDrawer } from '@/components/PickupDrawer';
import { OrderTicketModal } from '@/components/OrderTicketModal';
import { MENU_ITEMS, MenuItem } from '@/data/menu';
import { Language } from '@/lib/translations';
import { PickupOrderResponse } from '@/app/actions/order';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('fr');
  const [trayItems, setTrayItems] = useState<CustomizedOrderItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [itemToCustomize, setItemToCustomize] = useState<MenuItem | null>(null);
  const [orderTicketData, setOrderTicketData] = useState<{
    result: PickupOrderResponse;
    customerName: string;
    pickupTime: string;
  } | null>(null);

  // Filter 3 deals for the DailyDeals banner
  const featuredDeals = useMemo(() => {
    return MENU_ITEMS.filter((i) => i.id === 'combo-etudiant' || i.id === 'tacos-double' || i.id === 'bocadillo-special');
  }, []);

  // Quick 1-click add
  const handleQuickAdd = (item: MenuItem) => {
    const newItem: CustomizedOrderItem = {
      item,
      quantity: 1,
      selectedSauces: item.category === 'boissons' ? [] : ['sauce_fromagere'],
      extraCheese: false,
      extraEgg: false,
      specialNotes: '',
      totalPrice: item.price,
    };
    setTrayItems((prev) => [...prev, newItem]);
    setIsDrawerOpen(true);
  };

  // Open customizer modal
  const handleOpenCustomizer = (item: MenuItem) => {
    setItemToCustomize(item);
  };

  // Confirm customization from modal
  const handleConfirmCustomization = (customizedItem: CustomizedOrderItem) => {
    setTrayItems((prev) => [...prev, customizedItem]);
    setIsDrawerOpen(true);
  };

  // Update item quantity in tray
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setTrayItems((prev) => {
      const copy = [...prev];
      const target = copy[index];
      const unitPrice = target.totalPrice / target.quantity;
      target.quantity = newQty;
      target.totalPrice = unitPrice * newQty;
      return copy;
    });
  };

  // Remove item from tray
  const handleRemoveItem = (index: number) => {
    setTrayItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all items
  const handleClearTray = () => {
    setTrayItems([]);
  };

  // Success order trigger
  const handleOrderSuccess = (
    result: PickupOrderResponse,
    customerName: string,
    pickupTime: string
  ) => {
    setOrderTicketData({ result, customerName, pickupTime });
  };

  const trayCount = trayItems.reduce((acc, it) => acc + it.quantity, 0);
  const trayTotal = trayItems.reduce((acc, it) => acc + it.totalPrice, 0);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-stone-950 text-stone-100 flex flex-col ${
        lang === 'ar' ? 'font-arabic' : 'font-sans'
      }`}
    >
      {/* Top Navbar adhering to 3-zone contract */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        trayCount={trayCount}
        trayTotal={trayTotal}
        onOpenTray={() => setIsDrawerOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Live Kitchen Status & Safi context */}
        <Hero lang={lang} onOpenTray={() => setIsDrawerOpen(true)} />

        {/* Featured Combos & Daily Deals */}
        <DailyDeals
          lang={lang}
          deals={featuredDeals}
          onQuickAdd={handleQuickAdd}
          onCustomize={handleOpenCustomizer}
        />

        {/* Categorized Menu with Filters & Search (1 to 50 MAD) */}
        <MenuSection
          lang={lang}
          onQuickAdd={handleQuickAdd}
          onCustomize={handleOpenCustomizer}
        />

        {/* Safi Location, Operating Hours (14:00 - 02:00) & Reviews */}
        <LocationSection lang={lang} />
      </main>

      {/* Footer with Independent Portfolio Concept Disclaimer */}
      <Footer lang={lang} />

      {/* Mobile-Only Sticky Floating Action Bar (< 15% Viewport height) */}
      <MobileStickyBar
        lang={lang}
        trayCount={trayCount}
        trayTotal={trayTotal}
        onOpenTray={() => setIsDrawerOpen(true)}
      />

      {/* Modal: Item Customizer (Sauces & Extras) */}
      <CustomizationModal
        item={itemToCustomize}
        lang={lang}
        onClose={() => setItemToCustomize(null)}
        onConfirm={handleConfirmCustomization}
      />

      {/* Drawer: Pickup & Takeaway Order Tray */}
      <PickupDrawer
        isOpen={isDrawerOpen}
        lang={lang}
        trayItems={trayItems}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Modal: Generated Pickup Ticket Receipt */}
      <OrderTicketModal
        orderData={orderTicketData}
        lang={lang}
        onClose={() => setOrderTicketData(null)}
      />
    </div>
  );
}
