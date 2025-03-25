export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Monster Energy Zero Ultra',
    price: 3.99,
    image: '/images/products/monster-zero-ultra.png',
    description: 'Zero sugar, zero calories, maximum energy'
  },
  {
    id: '2',
    name: 'Monster Energy Original',
    price: 3.99,
    image: '/images/products/monster-original.png',
    description: 'The original Monster Energy drink'
  },
  {
    id: '3',
    name: 'Monster Energy Ultra Paradise',
    price: 3.99,
    image: '/images/products/monster-ultra-paradise.png',
    description: 'Refreshing kiwi and lime flavor'
  },
  {
    id: '4',
    name: 'Monster Energy Ultra Fiesta',
    price: 3.99,
    image: '/images/products/monster-ultra-fiesta.png',
    description: 'Mango and passion fruit blend'
  },
  {
    id: '5',
    name: 'Monster Energy Ultra Violet',
    price: 3.99,
    image: '/images/products/monster-ultra-violet.png',
    description: 'Smooth grape flavor with zero sugar'
  },
  {
    id: '6',
    name: 'Monster Energy Ultra Red',
    price: 3.99,
    image: '/images/products/monster-ultra-red.png',
    description: 'Berry flavor with zero sugar'
  }
]; 