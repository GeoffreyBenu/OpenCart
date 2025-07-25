
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, RefreshCw, Car } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/CartContext';
import { toast } from 'sonner';

const mockCars: Product[] = [
  {
    id: '1',
    name: '2023 BMW M3 Competition',
    price: 89999.99,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    description: 'Experience the ultimate driving machine with the BMW M3 Competition. This high-performance luxury sedan features a twin-turbo inline-6 engine producing 503 HP, sophisticated suspension system, premium leather interior, advanced infotainment system, and cutting-edge safety features. Perfect for enthusiasts who demand both luxury and performance.',
    category: 'Luxury Sedan',
    stock: 3
  },
  {
    id: '2',
    name: '2024 Tesla Model S Plaid',
    price: 129999.99,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    description: 'Revolutionary electric luxury sedan with tri-motor setup delivering 1020 HP and 0-60 mph in under 2 seconds. Features full self-driving capability, 17-inch touchscreen, premium audio system, and over 400 miles of range on a single charge.',
    category: 'Electric Sedan',
    stock: 5
  },
  {
    id: '3',
    name: '2023 Ford Mustang GT',
    price: 45999.99,
    image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop',
    description: 'Classic American muscle car with 5.0L V8 engine producing 450 HP. Features iconic design, performance suspension, Recaro seats, and advanced driver assistance technologies. A true embodiment of American automotive heritage.',
    category: 'Sports Coupe',
    stock: 7
  },
  {
    id: '4',
    name: '2024 Audi Q7 Premium Plus',
    price: 72999.99,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    description: 'Luxury 7-seater SUV with advanced technology, premium materials, and Quattro all-wheel drive. Features virtual cockpit, MMI infotainment, adaptive air suspension, and comprehensive safety suite.',
    category: 'Luxury SUV',
    stock: 4
  },
  {
    id: '5',
    name: '2023 Porsche 911 Carrera',
    price: 115999.99,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    description: 'Iconic sports car with rear-engine layout and 379 HP flat-six engine. Features precision handling, sport suspension, premium interior, and timeless design that defines automotive excellence.',
    category: 'Sports Coupe',
    stock: 2
  },
  {
    id: '6',
    name: '2024 Toyota Prius Prime',
    price: 32999.99,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
    description: 'Hybrid plug-in sedan with excellent fuel economy and eco-friendly technology. Features advanced hybrid system, solar roof panel, smart connectivity, and spacious interior with premium materials.',
    category: 'Hybrid Sedan',
    stock: 12
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    // TODO: Replace with actual API call to fetch car from MongoDB
    // fetch(`/api/cars/${id}`).then(response => response.json()).then(data => setCar(data))
    const foundCar = mockCars.find(p => p.id === id);
    setTimeout(() => {
      setCar(foundCar || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (car) {
      for (let i = 0; i < quantity; i++) {
        dispatch({ type: 'ADD_TO_CART', payload: car });
      }
      toast.success(`${quantity} ${car.name}${quantity > 1 ? 's' : ''} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center py-16">
        <Car className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Car not found</h2>
        <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
          ← Back to cars
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        <span>Back to Cars</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img 
              src={car.image} 
              alt={car.name}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="inline-block bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
              {car.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{car.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
                <span className="text-gray-600 ml-2">(4.8/5 - 142 reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{car.description}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-emerald-600">${car.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500">Available: {car.stock} cars</span>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(car.stock, quantity + 1))}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-lg"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart - ${(car.price * quantity).toLocaleString()}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <Truck className="text-emerald-600 mx-auto mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">Free Delivery</span>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <Shield className="text-emerald-600 mx-auto mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">3 Year Warranty</span>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <RefreshCw className="text-emerald-600 mx-auto mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
