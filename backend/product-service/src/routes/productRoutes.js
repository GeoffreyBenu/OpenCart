const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
//const validate = require('../validators/productValidator');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Protected routes (would add auth middleware later)
console.log('productController:', productController);

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;