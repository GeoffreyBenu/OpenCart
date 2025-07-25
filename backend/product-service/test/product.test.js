const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');  
const Product = require('../src/models/Product');
const { createValidProduct } = require('./testHelpers');
const { NotFoundError } = require('../src/utils/errors');

chai.use(chaiHttp);
const expect = chai.expect;



describe('Product API', () => {
  beforeEach(async () => {
    // Clear all products before each test
    await Product.deleteMany({});
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      // Create test products with unique names
      const testProducts = [
        {
          name: 'Test Product 1-' + Date.now(),
          description: 'Valid description with more than 20 characters 1',
          price: 1000,
          category: 'Luxury Sedan',
          stock: 10
        },
        {
          name: 'Test Product 2-' + Date.now(),
          description: 'Valid description with more than 20 characters 2',
          price: 2000,
          category: 'Sports Coupe',
          stock: 5
        }
      ];

      await Product.insertMany(testProducts);

      const res = await chai.request(app).get('/api/products');
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('array').with.lengthOf(2);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Unique Product ' + Date.now(), // Ensure unique name
        description: 'Valid description with more than 20 characters',
        price: 3000,
        category: 'Electric Sedan',
        stock: 15
      };

      const res = await chai.request(app)
        .post('/api/products')
        .send(newProduct);

      expect(res).to.have.status(201);
      expect(res.body.data).to.include({
        name: newProduct.name,
        price: newProduct.price
      });
    });

    it('should return 400 for invalid product data', async () => {
      const res = await chai.request(app)
        .post('/api/products')
        .send({ invalid: 'data' });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Validation failed');
    });
  });
});