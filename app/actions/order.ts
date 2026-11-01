'use server';

export interface OrderItemPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sauce?: string;
  notes?: string;
}

export interface PickupOrderRequest {
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  notes?: string;
  items: OrderItemPayload[];
  totalMAD: number;
}

export interface PickupOrderResponse {
  success: boolean;
  orderId?: string;
  estimatedReadyTime?: string;
  message?: string;
  error?: string;
}

export async function submitPickupOrder(data: PickupOrderRequest): Promise<PickupOrderResponse> {
  // Validate input
  if (!data.customerName || data.customerName.trim().length < 2) {
    return { success: false, error: 'Veuillez saisir votre nom pour le retrait.' };
  }

  if (!data.customerPhone || data.customerPhone.trim().length < 8) {
    return { success: false, error: 'Veuillez saisir un numéro de téléphone valide pour le suivi.' };
  }

  if (!data.items || data.items.length === 0) {
    return { success: false, error: 'Votre plateau est vide. Sélectionnez au moins un article.' };
  }

  // Generate unique Safi order ID (e.g. SAF-4821)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `SAF-${randomSuffix}`;

  // Calculate estimated ready time based on pickup preference
  let estimatedTime = data.pickupTime || 'Dans 15-20 min';
  if (estimatedTime === 'asap') {
    estimatedTime = 'Dans 12-15 minutes';
  }

  // In a production setup this would store to a DB or send to the kitchen display
  return {
    success: true,
    orderId,
    estimatedReadyTime: estimatedTime,
    message: `Commande #${orderId} confirmée ! Votre repas sera prêt au comptoir à Safi.`,
  };
}
