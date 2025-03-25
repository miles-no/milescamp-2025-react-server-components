import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const mockCartItems: CartItem[] = [
  {
    product: {
      id: '1',
      name: 'Monster Energy Zero Ultra',
      price: 3.99,
      image: '/images/products/monster-zero-ultra.png',
      description: 'Zero sugar, zero calories, maximum energy'
    },
    quantity: 2
  },
  {
    product: {
      id: '2',
      name: 'Monster Energy Original',
      price: 3.99,
      image: '/images/products/monster-original.png',
      description: 'The original Monster Energy drink'
    },
    quantity: 1
  }
]; 