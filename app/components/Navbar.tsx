'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-white bg-blue-600' : 'text-gray-300 hover:text-white hover:bg-blue-600';
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-white text-xl font-bold">Vibe Store</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/products')}`}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/cart')}`}
            >
              Cart
            </Link>
            <Link
              href="/checkout"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/checkout')}`}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 