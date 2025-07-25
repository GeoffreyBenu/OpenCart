
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Truck, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-emerald-900/95 to-emerald-800/95 rounded-2xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop")'
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-8">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Car className="text-emerald-400" size={72} />
              <h1 className="text-6xl font-bold">MagariSeller Auto</h1>
            </div>
            <p className="text-2xl text-emerald-100 mb-8 leading-relaxed">
              Your trusted destination for premium cars at unbeatable prices. 
              Quality guaranteed, dreams delivered.
            </p>
            <Link 
              to="/cars"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
            >
              Browse Our Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <Shield className="text-emerald-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">3 Year Warranty</h3>
          <p className="text-gray-600">Comprehensive coverage for peace of mind</p>
        </div>
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <Truck className="text-emerald-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Free Delivery</h3>
          <p className="text-gray-600">Nationwide delivery at no extra cost</p>
        </div>
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <Star className="text-emerald-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
          <p className="text-gray-600">Only the finest vehicles make our selection</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
