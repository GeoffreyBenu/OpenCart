const Product = require('../models/Product');

class ProductService {
  static async getAllProducts(queryParams) {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = queryParams;
    
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };
    
    const products = await Product.find(query)
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);
      
    const total = await Product.countDocuments(query);
    
    return {
      products,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit)
      }
    };
  }

  static async getProductById(id) {
    return await Product.findOne({ _id: id, isActive: true });
  }

  static async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  static async updateProduct(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteProduct(id) {
    return await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}

module.exports = ProductService;