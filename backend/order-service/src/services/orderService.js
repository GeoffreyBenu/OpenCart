const Order = require('../models/Order');
const ProductService = require('./productService');
const { BadRequestError, NotFoundError } = require('../utils/errors');

class OrderService {
  static async getAllOrders(queryParams) {
    const { status, page = 1, limit = 10 } = queryParams;
    
    const query = {};
    if (status) query.status = status;
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };
    
    const orders = await Order.find(query)
      .populate('items.product', 'name image')
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);
      
    const total = await Order.countDocuments(query);
    
    return {
      orders,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit)
      }
    };
  }

  static async getOrderById(id) {
    const order = await Order.findById(id)
      .populate('items.product', 'name image category');
    
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    
    return order;
  }

  static async createOrder(orderData) {
    const { items, customerInfo, shippingAddress } = orderData;
    
    // Validate products and calculate totals
    let subtotal = 0;
    const validatedItems = [];
    
    for (const item of items) {
      const product = await ProductService.getProductById(item.product);
      
      if (!product || !product.isActive) {
        throw new BadRequestError(`Product not found or inactive: ${item.product}`);
      }
      
      if (product.stock < item.quantity) {
        throw new BadRequestError(
          `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      validatedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }
    
    // Calculate tax and total
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50000 ? 0 : 1500; // Free shipping over $50k
    const total = subtotal + tax + shipping;
    
    // Create order
    const order = new Order({
      customerInfo,
      shippingAddress,
      items: validatedItems,
      subtotal,
      tax,
      shipping,
      total
    });
    
    const savedOrder = await order.save();
    
    // Update product stock
    await ProductService.updateProductsStock(items, 'decrement');
    
    return savedOrder.populate('items.product', 'name image category');
  }

  static async updateOrderStatus(id, updateData) {
    const { status, paymentStatus } = updateData;
    
    const updateFields = {};
    if (status) updateFields.status = status;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;
    
    const order = await Order.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('items.product', 'name image category');
    
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    
    return order;
  }

  static async cancelOrder(id) {
    const order = await Order.findById(id);
    
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    
    if (order.status === 'shipped' || order.status === 'delivered') {
      throw new BadRequestError('Cannot cancel shipped or delivered orders');
    }
    
    // Restore product stock
    await ProductService.updateProductsStock(order.items, 'increment');
    
    order.status = 'cancelled';
    await order.save();
    
    return order;
  }
}

module.exports = OrderService;