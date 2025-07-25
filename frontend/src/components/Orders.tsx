
import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

interface Order {
  id: string;
  items: any[];
  total: number;
  shippingAddress: any;
  paymentMethod: any;
  status: string;
  orderDate: string;
  estimatedDelivery: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch orders
    setTimeout(() => {
      const savedOrders = JSON.parse(localStorage.getItem('magari-orders') || '[]');
      setOrders(savedOrders);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock className="text-yellow-500" size={20} />;
      case 'Shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'Delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
        <p className="text-gray-600 mb-8">When you place orders, they will appear here.</p>
        <a 
          href="/" 
          className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-medium"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                  <p className="text-gray-600">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Total Amount</span>
                  <p className="font-bold text-emerald-600">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Payment Method</span>
                  <p className="font-medium">•••• {order.paymentMethod.last4}</p>
                </div>
                <div>
                  <span className="text-gray-500">Estimated Delivery</span>
                  <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity} × ${item.price}</p>
                        </div>
                        <p className="font-medium text-emerald-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <MapPin size={18} />
                    <span>Shipping Address</span>
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
              
              {order.status === 'Shipped' && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="text-blue-600" size={20} />
                    <span className="font-medium text-blue-800">Your order is on the way!</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Tracking number: MG{order.id.slice(-6).toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
