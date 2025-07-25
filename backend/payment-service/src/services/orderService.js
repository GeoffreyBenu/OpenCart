const axios = require('axios');
const { NotFoundError, BadRequestError } = require('../utils/errors');

class OrderService {
  static async getOrderById(orderId) {
    try {
      const response = await axios.get(`${process.env.ORDER_SERVICE_URL}/api/orders/${orderId}`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundError('Order not found');
      }
      throw error;
    }
  }

  static async updateOrderPaymentStatus(orderId, paymentStatus) {
    try {
      await axios.put(`${process.env.ORDER_SERVICE_URL}/api/orders/${orderId}/status`, {
        paymentStatus
      });
    } catch (error) {
      throw new Error('Failed to update order payment status');
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      await axios.put(`${process.env.ORDER_SERVICE_URL}/api/orders/${orderId}/status`, {
        status
      });
    } catch (error) {
      throw new Error('Failed to update order status');
    }
  }
}

module.exports = OrderService;