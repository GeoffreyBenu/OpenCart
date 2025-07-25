const ProductService = require('../services/productService');
const { BadRequestError, ValidationError } = require('../utils/errors');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { products, pagination } = await ProductService.getAllProducts(req.query);
    res.json({
      success: true,
      count: products.length,
      pagination,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError(err.errors));
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductService.deleteProduct(req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};