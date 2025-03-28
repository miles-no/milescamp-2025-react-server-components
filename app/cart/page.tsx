'use client';

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '../mocks/cart';

function CartItems() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch cart items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError('Failed to load cart items');
      console.error('Error fetching cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      setError(null);
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error('Failed to update quantity');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove item');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const totalPrice = items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
        <button
          onClick={fetchCartItems}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item: CartItem) => (
        <div
          key={item.product.id}
          className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="relative w-24 h-24">
            <Image
              src={item.product.image}
              alt={item.product.name}
              fill
              className="object-contain"
            />
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{item.product.name}</h2>
            <p className="text-gray-600">{item.product.description}</p>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-gray-500">Quantity: {item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <span className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Your cart is empty. Add some products to get started!
        </div>
      ) : (
        <div className="flex justify-end items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
          <Link
            href="/checkout"
            className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

function CarSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="relative w-24 h-24 bg-gray-200 animate-pulse rounded-lg" />
          
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="flex items-center gap-4 mt-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <CartItems />
    </div>
  );
} 