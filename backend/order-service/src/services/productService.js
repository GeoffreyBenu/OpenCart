const axios = require('axios');
const { NotFoundError } = require('../utils/errors');

class ProductService {
  static async getProductById(productId) {
    try {
      // In a real microservice architecture, this would call the Product Service API
      // For now, we'll simulate it with a direct DB call (to be replaced)
      const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundError('Product not found');
      }
      throw error;
    }
  }

  static async updateProductsStock(items, operation) {
    try {
      // This would call the Product Service API to update stock
      // For now, simulating with direct DB calls (to be replaced)
      await axios.patch(`${process.env.PRODUCT_SERVICE_URL}/products/stock`, {
        items,
        operation
      });
    } catch (error) {
      throw new Error('Failed to update product stock');
    }
  }
}

module.exports = ProductService;