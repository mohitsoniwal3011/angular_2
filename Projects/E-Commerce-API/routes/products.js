const express = require('express');
const router = express.Router();
const {authHandlerMiddleware,authorizePermissions} = require('../middleware/authentication')
const {
    createProduct, getAllProducts, updateProduct, uploadImage, getSingleProduct, deleteProduct
}= require('../controller/products');

const {
    getSingleProductReviews
}  = require('../controller/review');

router.route('/').get(getAllProducts).post([authHandlerMiddleware,authorizePermissions('admin')],createProduct);

router.route('/uploadImage').post([authHandlerMiddleware,authorizePermissions('admin')], uploadImage);

router.route('/:id')
.get(getSingleProduct).
patch([authHandlerMiddleware, authorizePermissions('admin')],updateProduct ).
delete([authHandlerMiddleware, authorizePermissions('admin')], deleteProduct);

router.route('/:id/reviews').get(getSingleProductReviews);


module.exports = router;
