const express = require('express');
const router = express.Router();
const {authHandlerMiddleware, authorizePermissions} = require('../middleware/authentication')
const {
    getAllOrders, getSingleOrder, getCurrentUserOrders,
    createOrder, updateOrder
} = require('../controller/orders');

router
  .route('/')
  .post(authHandlerMiddleware, createOrder)
  .get(authHandlerMiddleware, authorizePermissions('admin'), getAllOrders);

router.route('/showAllMyOrders').get(authHandlerMiddleware, getCurrentUserOrders);

router
  .route('/:id')
  .get(authHandlerMiddleware, getSingleOrder)
  .patch(authHandlerMiddleware, updateOrder);


module.exports = router;