'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CartItem } from '../mocks/cart';

export default function CartTotalBar() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error('Failed to fetch cart items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartItems();
    };

    window.addEventListener('cart-update', handleCartUpdate);
    fetchCartItems();

    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (isLoading) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            href="/cart"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
} 