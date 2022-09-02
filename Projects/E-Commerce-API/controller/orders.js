const Order = require('../models/order');
const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils/checkPermissions');
const { is } = require('express/lib/request');


const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue';
    return { client_secret, amount };
};


const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;
    // console.log(cartItems, tax , shippingFee);
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }

    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shipping fee');
    }
    let orderItems = [];
    let subtotal = 0;
    for (const item of cartItems) {
        // console.log("checking for : ", item);
        const product = await Product.findById({ _id: item.product });
        // console.log("product found : ", product);
        if (!product) {
            throw new CustomError.NotFoundError(`No product with the id : ${item.product}`);
        }
        const { name, price, image, _id } = product;
        const singleOrderItem = {
            amount: item.amount,
            name, price, image , product : item.product
        }
        // console.log(singleOrderItem);
        // console.log({name , price , image , _id});
        //add item to order 
        orderItems.push(singleOrderItem);
        subtotal += item.amount * price;
        // console.log(orderItems, subTotal);
        //calculate total amount 


        // console.log("total : ", total);

    }

    const total = tax + shippingFee + subtotal;
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd',
    });
    const order = await Order.create({
        tax,
        shippingFee,
        subtotal,
        total,
        user: req.user.userId,
        orderItems,
        clientSecret: paymentIntent.client_secret
    })
    res.status(StatusCodes.CREATED).json({order, clientSecret : order.clientSecret});
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({count : orders.length, orders : orders});
}

const updateOrder = async (req, res) => {
    const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  let isAllowed =  checkPermissions(req.user, order.user);
  if(!isAllowed){
        throw new CustomError.UnauthenticatedError('Not Authorized to access this route')
  }

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
}

const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({user : req.user.userId});
    res.status(StatusCodes.OK).json({count : orders.length, orders : orders});
}

const getSingleOrder = async (req, res) => {
    const order = await Order.findOne({_id : req.params.id});
    if(!order){
        throw new CustomError.NotFoundError(`Order with is ${req.params.id} does not exist`);
    }
    let isAllowed = checkPermissions(req.user, order.user);
    if(!isAllowed){
        throw new CustomError.UnauthenticatedError('Not Authorized to access this route')
    }
    res.status(StatusCodes.OK).json({order});
}



module.exports = {
    getAllOrders, getSingleOrder, getCurrentUserOrders,
    createOrder, updateOrder
}