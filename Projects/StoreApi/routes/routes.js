const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const {
    getAllProducts, 
    getSingleProduct,
    getAllProductsStatic
} = require('../controllers/products');
router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic)
router.route('/:id').get(getSingleProduct);

module.exports = router;