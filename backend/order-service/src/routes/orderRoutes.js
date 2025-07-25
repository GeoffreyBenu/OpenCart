const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const validate = require('../middlewares/validation');

// Public routes
//router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrder);

// Protected routes (would add auth middleware later)
router.post('/', validate.createOrder, orderController.createOrder);
router.put('/:id/status', validate.updateOrderStatus, orderController.updateOrderStatus);
//router.delete('/:id', orderController.cancelOrder);

module.exports = router;