// test/testHelpers.js
module.exports = {
  createValidProduct: (overrides = {}) => ({
    name: 'Valid Product',
    description: 'This is a valid product description with more than 20 characters',
    price: 1000,
    category: 'Luxury Sedan',
    stock: 10,
    image: 'https://example.com/product.jpg',
    ...overrides
  })
};