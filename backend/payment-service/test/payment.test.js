const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const Payment = require('../src/models/Payment');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

const mockOrderId = new mongoose.Types.ObjectId(); // Use proper ObjectId

describe('Payment Service', () => {
  beforeEach(async () => {
    await Payment.deleteMany({});
  });

  describe('POST /api/payments', () => {
    it('should process a payment successfully', async () => {
      const paymentData = {
        order: mockOrderId,
        amount: 10000, // in cents
        paymentMethod: 'credit_card',
        paymentDetails: {
          cardLast4: '1111',
          cardBrand: 'visa'
        }
      };

      const res = await chai.request(app)
        .post('/api/payments')
        .send(paymentData);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.have.property('status', 'completed');
    });
  });

  describe('GET /api/payments/:id', () => {
    it('should get payment details', async () => {
      const payment = await Payment.create({
        order: mockOrderId,
        amount: 10000,
        paymentMethod: 'credit_card',
        status: 'completed',
        paymentDetails: {
          cardLast4: '1111',
          cardBrand: 'visa'
        }
      });

      const res = await chai.request(app)
        .get(`/api/payments/${payment._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.have.property('amount', 10000);
    });
  });

  describe('GET /api/payments/order/:orderId', () => {
    it('should get payments by order ID', async () => {
      await Payment.create({
        order: mockOrderId,
        amount: 10000,
        paymentMethod: 'credit_card',
        status: 'completed',
        paymentDetails: {
          cardLast4: '1111',
          cardBrand: 'visa'
        }
      });

      const res = await chai.request(app)
        .get(`/api/payments/order/${mockOrderId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.be.an('array').with.lengthOf(1);
    });
  });
});