import { Product } from '../mocks/products';
import { CartItem } from '../mocks/cart';

// Simulated delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for cart items
let cartItems: CartItem[] = [];

export async function getCartItems(): Promise<CartItem[]> {
  await delay(500); // Simulate network delay
  return cartItems;
}

export async function addToCart(product: Product): Promise<CartItem[]> {
  await delay(500); // Simulate network delay
  
  const existingItem = cartItems.find(item => item.product.id === product.id);
  
  if (existingItem) {
    cartItems = cartItems.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    cartItems = [...cartItems, { product, quantity: 1 }];
  }
  
  return cartItems;
}

export async function removeFromCart(productId: string): Promise<CartItem[]> {
  await delay(500); // Simulate network delay
  cartItems = cartItems.filter(item => item.product.id !== productId);
  return cartItems;
}

export async function updateCartItemQuantity(productId: string, quantity: number): Promise<CartItem[]> {
  await delay(500); // Simulate network delay
  
  if (quantity < 1) {
    return removeFromCart(productId);
  }
  
  cartItems = cartItems.map(item =>
    item.product.id === productId
      ? { ...item, quantity }
      : item
  );
  
  return cartItems;
}

export async function clearCart(): Promise<void> {
  await delay(500); // Simulate network delay
  cartItems = [];
} 