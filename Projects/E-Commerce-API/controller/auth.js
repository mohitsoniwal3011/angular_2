const { StatusCodes } = require("http-status-codes");
const User = require("../models/user")
const CustomError = require('../errors')
const JwtUtils = require('../utils/index');


const logInUser = async (req, res )=> {
    const {email , password} = req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user =await User.findOne({email : email});
    if(!user){
        throw new CustomError.UnauthenticatedError(`user with email ${email} does not exist`);
    } 
    const isValidPassword = await user.comparePasswords(password);
    console.log(isValidPassword);
    if(!isValidPassword){
        console.log("about to throw error");
        throw new CustomError.UnauthenticatedError('Invalid Password');
    }
    const tokenUser = JwtUtils.createToken(user);
    JwtUtils.attachCookiesToResponse({res : res, user : tokenUser})
    res.status(200).json({user : tokenUser})
}

const registerUser =async (req, res )=> {
    const {name , email , password} = req.body;
    const isEmailAlreadyExist =await User.findOne({email});
    if(isEmailAlreadyExist){
        throw new CustomError.BadRequestError('Email Already Exist');
    }
    const countDocs =await User.countDocuments({}) === 0;
    const role = countDocs ? 'admin' : 'user';
    const user =await User.create({name , email, password, role});
    const tokenUser = JwtUtils.createToken(user);
    JwtUtils.attachCookiesToResponse({res : res , user : tokenUser});
    res.status(StatusCodes.CREATED).json({user : tokenUser});
}

const logOutUser =async (req, res )=> {
   res.cookie('token','logout', {
       httpOnly : true, 
       expires : new Date(Date.now()),
       secure : process.env.NODE_ENV  === 'production'
   })
   res.status(StatusCodes.OK).json({msg : 'user logged out'})
}


module.exports = {
    logInUser, logOutUser, registerUser
}