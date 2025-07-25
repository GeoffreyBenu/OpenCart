
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Car, Home, Info, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { state } = useCart();
  const location = useLocation();
  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Car className="text-emerald-600" size={20} />
            </div>
            <span className="text-white text-xl font-bold">MagariSeller Auto</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-500'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link 
              to="/cars" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/cars') || location.pathname.startsWith('/product')
                  ? 'bg-emerald-500 text-white' 
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-500'
              }`}
            >
              <Car size={18} />
              <span>Cars</span>
            </Link>

            <Link 
              to="/about" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/about') 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-500'
              }`}
            >
              <Info size={18} />
              <span>About</span>
            </Link>

            <Link 
              to="/contact" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/contact') 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-500'
              }`}
            >
              <Mail size={18} />
              <span>Contact</span>
            </Link>

            <Link 
              to="/cart" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                isActive('/cart') 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-500'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link 
              to="/orders" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/orders') 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-500'
              }`}
            >
              <Package size={18} />
              <span>Orders</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
