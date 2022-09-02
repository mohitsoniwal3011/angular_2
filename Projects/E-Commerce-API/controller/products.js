const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Product= require('../models/product');
const Review = require('../models/review');
const path = require('path');


const getAllProducts =async (req, res) => {
    const products= await Product.find({});
    res.status(200).send({count : products.length , products : products});
}

const createProduct = async(req, res) => {
    req.body.user = req.user.userId;
    const prod =await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product : prod});
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id : req.params.id}).populate('reviews');
    if(!product){
        throw new CustomError.NotFoundError(`No product found with the id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({product : product});
}

const updateProduct =async  (req, res) => {
    const {id : productID }  = req.params;
    const prod = await Product.findByIdAndUpdate({_id : productID}, req.body, {new : true, runValidators: true});
    if(!prod){
        throw new CustomError.NotFoundError(`No product found with the id ${productID}`);
    }
    res.status(StatusCodes.CREATED).json({product : prod});
}


const deleteProduct =async (req, res) => {
    const {id : productID }  = req.params;
    console.log("product id got : ", productID);
    // const deletedReviews = await Review.deleteMany({product : productID});
    // console.log("deleted reviews ", deletedReviews);
    const prod = await Product.findOne({_id : productID});
    if(!prod){
        throw new CustomError.NotFoundError(`No product found with the id : ${productID}`);
    }
    prod.remove();
    const deletedProduct = await Product.deleteOne({_id : productID});
    res.status(StatusCodes.OK).json({msg : "product removed successfully"});
}


const uploadImage =async (req, res) => {
    console.log(req.files);
    const productImage = req.files.image ;
    
    if(!req.files){
        throw new CustomError.BadRequestError('No File Uploaded');
    }
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload image');
    }
    const maxSize = 1024*1024; 
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Please upload image smaller then 1MB');
    }
    const imagePath = path.join(__dirname, '../public/uploads/'+ `${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({image : `/uploads/${productImage.name}`});
}






module.exports = {
    createProduct, getAllProducts, updateProduct, uploadImage, getSingleProduct, deleteProduct
}