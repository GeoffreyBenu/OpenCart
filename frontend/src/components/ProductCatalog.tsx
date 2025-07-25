
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Car } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/CartContext';
import { toast } from 'sonner';

const mockCars: Product[] = [
  {
    id: '1',
    name: '2023 BMW M3 Competition',
    price: 89999.99,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=500&fit=crop',
    description: 'High-performance luxury sedan with twin-turbo inline-6 engine, 503 HP.',
    category: 'Luxury Sedan',
    stock: 3
  },
  {
    id: '2',
    name: '2024 Tesla Model S Plaid',
    price: 129999.99,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=500&fit=crop',
    description: 'Electric luxury sedan with tri-motor setup, 1020 HP.',
    category: 'Electric Sedan',
    stock: 5
  },
  {
    id: '3',
    name: '2023 Ford Mustang GT',
    price: 45999.99,
    image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=500&h=500&fit=crop',
    description: 'Classic American muscle car with 5.0L V8 engine, 450 HP.',
    category: 'Sports Coupe',
    stock: 7
  },
  {
    id: '4',
    name: '2024 Audi Q7 Premium Plus',
    price: 72999.99,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=500&fit=crop',
    description: 'Luxury 7-seater SUV with advanced technology and Quattro AWD.',
    category: 'Luxury SUV',
    stock: 4
  },
  {
    id: '5',
    name: '2023 Porsche 911 Carrera',
    price: 115999.99,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop',
    description: 'Iconic sports car with rear-engine layout, 379 HP.',
    category: 'Sports Coupe',
    stock: 2
  },
  {
    id: '6',
    name: '2024 Toyota Prius Prime',
    price: 32999.99,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&h=500&fit=crop',
    description: 'Hybrid plug-in sedan with excellent fuel economy.',
    category: 'Hybrid Sedan',
    stock: 12
  }
];

const ProductCatalog = () => {
  const [cars, setCars] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (car: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: car });
    toast.success(`${car.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-emerald-900/90 to-emerald-800/90 rounded-2xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop")'
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-8">
          <div>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Car className="text-emerald-400" size={56} />
              <h1 className="text-5xl font-bold">Premium Cars</h1>
            </div>
            <p className="text-xl text-emerald-100 max-w-2xl">
              Discover the finest collection of luxury and performance vehicles at unbeatable prices
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img 
                src={car.image} 
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full font-bold">
                ${car.price.toLocaleString()}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
                  {car.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{car.description}</p>
              
              <button
                onClick={() => handleAddToCart(car)}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
