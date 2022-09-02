const Product = require('../models/product');
const Review = require('../models/review');
const {StatusCodes }=  require('http-status-codes');
const CustomError = require('../errors');
const {checkPermissions}  = require('../utils/checkPermissions')


const createReview  = async (req, res) => {
    req.body.user = req.user.userId;
    const {product : productId} = req.body;
    const product = await Product.findOne({_id : productId});
    if(!product){
        throw new CustomError.BadRequestError(`No product with id : ${productId}`);
    }
    const alreadyExist =await Review.findOne({user : req.user.userId, product : productId});
    if(alreadyExist){
        throw new CustomError.BadRequestError('Already submitted review for this product');
    }
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({review : review});
}   

const getSingleReview = async (req, res) => {
    const {id : reviewId} = req.params
    const review = await Review.findOne({_id : reviewId}).populate({
        path : 'product', 
        select : 'name company price'
    }).populate({
        path : 'user', 
        select : 'name'
    });
    if(!review){
        throw new CustomError.NotFoundError(`No review with id : ${reviewId}`);
    }
    res.status(StatusCodes.OK).json({review});
}

const updateReview  = async (req, res) => {
    const {id : reviewId }  = req.params;
    const {comment , title , rating } = req.body;
    if(!comment || !rating  || !title){
        throw new CustomError.BadRequestError('Please provide review rating and title')
    }
    const review = await Review.findOne({_id : reviewId});
    if(!review){
        throw new CustomError.NotFoundError(`No review with the id : ${reviewId}`);
    }
    const isAllowed = checkPermissions(req.user,review.user);
    if(!isAllowed){
        throw new CustomError.UnauthenticatedError('Not Authorized to access this route');
    }
    review.comment = comment; 
    review.title = title; 
    review.rating = rating; 
    await review.save();
    res.status(StatusCodes.OK).json({review});
}

const deleteReview  = async (req, res) => {
    const {id : reviewId} = req.params
    const review = await Review.findOne({_id : reviewId});
    if(!review){
        throw new CustomError.NotFoundError(`No review with id : ${reviewId}`);
    }
    const isAllowed = checkPermissions(req.user,review.user);
    if(!isAllowed){
        throw new CustomError.UnauthenticatedError('Not Authorized to access this route');
    }
    await review.remove();
    res.status(StatusCodes.OK).json({msg : 'Review deleted successfully'});
}

const getAllReviews  = async (req, res) => {
    const reviews = await Review.find({}).populate({
        path : 'product', 
        select : 'name company price'
    }).populate({
        path : 'user', 
        select : 'name'
    });
    res.status(StatusCodes.OK).json({count : reviews.length , reviews : reviews});
}

const getSingleProductReviews = async (req, res) => {
    const { id: productId } = req.params;
    const reviews = await Review.find({ product: productId });
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
  };

module.exports = {
    createReview, getAllReviews, getSingleReview, updateReview, deleteReview, getSingleProductReviews
}