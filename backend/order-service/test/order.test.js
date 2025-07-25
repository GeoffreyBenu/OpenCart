const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const Order = require('../src/models/Order');

chai.use(chaiHttp);
const expect = chai.expect;

const createValidOrder = () => ({
  orderNumber: `ORD-${Date.now()}`,
  customerInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890'
  },
  shippingAddress: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  products: [{
    productId: '507f1f77bcf86cd799439011',
    quantity: 2,
    price: 100,
    name: 'Test Product'
  }],
  subtotal: 200,
  tax: 20,
  shipping: 10,
  total: 230,
  paymentMethod: 'credit_card',
  status: 'pending'
});

describe('Order Service', () => {
  beforeEach(async () => {
    await Order.deleteMany({});
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const res = await chai.request(app)
        .post('/api/orders')
        .send(createValidOrder());

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('order');
      expect(res.body.order).to.have.property('_id');
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should get a single order', async () => {
      const order = await Order.create(createValidOrder());
      const res = await chai.request(app).get(`/api/orders/${order._id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('order');
      expect(res.body.order).to.have.property('_id');
    });

    it('should return 404 for non-existent order', async () => {
      const res = await chai.request(app).get('/api/orders/507f1f77bcf86cd799439011');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    });
  });

  
});