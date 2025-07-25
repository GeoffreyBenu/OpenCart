
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Car API endpoints
export const carAPI = {
  // Get all cars
  getAllCars: async () => {
    const response = await fetch(`${API_BASE_URL}/cars`);
    if (!response.ok) throw new Error('Failed to fetch cars');
    return response.json();
  },

  // Get car by ID
  getCarById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    if (!response.ok) throw new Error('Failed to fetch car');
    return response.json();
  },

  // Add new car (admin functionality)
  addCar: async (carData: any) => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) throw new Error('Failed to add car');
    return response.json();
  },

  // Update car (admin functionality)
  updateCar: async (id: string, carData: any) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) throw new Error('Failed to update car');
    return response.json();
  },

  // Delete car (admin functionality)
  deleteCar: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete car');
    return response.json();
  },
};

// Order API endpoints
export const orderAPI = {
  // Get all orders for a user
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Create new order
  createOrder: async (orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Get order by ID
  getOrderById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  // Update order status
  updateOrderStatus: async (id: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  // Delete order
  deleteOrder: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete order');
    return response.json();
  },
};

// Payment API endpoints
export const paymentAPI = {
  // Process payment
  processPayment: async (paymentData: any) => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) throw new Error('Failed to process payment');
    return response.json();
  },

  // Get payment by order ID
  getPaymentByOrderId: async (orderId: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/order/${orderId}`);
    if (!response.ok) throw new Error('Failed to fetch payment');
    return response.json();
  },

  // Refund payment
  refundPayment: async (paymentId: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/refund`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to refund payment');
    return response.json();
  },
};

// Generic API error handler
export const handleAPIError = (error: any) => {
  console.error('API Error:', error);
  if (error.message) {
    throw new Error(error.message);
  }
  throw new Error('An unexpected error occurred');
};
