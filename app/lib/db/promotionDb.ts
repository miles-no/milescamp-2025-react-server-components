import { Product } from '@/app/mocks/products';

export interface PromotionBanner {
  product: Product;
  bannerImage: string;
  discountPercentage: number;
  promotionText: string;
  validUntil: string;
}

// Simulated delay function with extra long delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated promotion data
const mockPromotion: PromotionBanner = {
  product: {
    id: '1',
    name: 'Monster Energy Zero Ultra',
    price: 3.99,
    image: '/images/products/monster-zero-ultra.png',
    description: 'Zero sugar, zero calories, maximum energy'
  },
  bannerImage: '/images/promotions/zero-ultra-banner.jpg',
  discountPercentage: 20,
  promotionText: 'Get 20% off on Monster Energy Zero Ultra!',
  validUntil: '2024-12-31'
};

export async function getCurrentPromotion(): Promise<PromotionBanner> {
  // Simulate a very slow network delay (2 seconds)
  await delay(2000);
  
  // Simulate random success/failure (90% success rate)
  const isSuccess = Math.random() < 0.9;
  
  if (!isSuccess) {
    throw new Error('Failed to fetch promotion data');
  }
  
  return mockPromotion;
} 