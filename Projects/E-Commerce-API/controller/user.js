const { StatusCodes } = require("http-status-codes");
const CustomError = require('../errors/index');
const User = require("../models/user");
const Utils = require('../utils')

const getAllUsers = async (req, res) => {
    const users = await User.find({role : 'user'}).select('-password');
    res.status(StatusCodes.OK).json({nbHits : users.length, users : users});
}

const getSingleUser = async (req, res) => {
    
    const user = await User.findOne({_id : req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`User with id ${req.params.id} does not exist`);
    }
    const isAllowedToSee = Utils.checkPermissions(req.user, req.params.id);
    if(!isAllowedToSee){
        throw new CustomError.UnauthorizedError('Only admins can see other users!');
    }
    res.status(StatusCodes.OK).json({user : user});
}

const showCurrentUser = async (req, res) => {
    if(!req.user){
        throw new CustomError.BadRequestError('unauthorized ')
    }
    res.status(StatusCodes.OK).json(req.user);
}

const updateUser = async (req, res) => {
    const {name , email } = req.body;
    if(!name || !email){
        throw new CustomError.BadRequestError('Please provide name and password');
    }
    const user = await User.findOne({_id : req.user.userId});
    console.log("found user : ", user);
    user.name = name ;
    user.email =email;
    const newUser = await user.save()
    const token =Utils.createToken(user);
    Utils.attachCookiesToResponse({res , user : token});
    res.status(StatusCodes.OK).json({user : token});
}

const updateUserPassword = async (req, res) => {
    const {oldPassword , newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('please provide both values');
    }
    const user = await User.findOne({_id : req.user.userId});
    const isValidPassword = await user.comparePasswords(oldPassword);
    if(!isValidPassword){
        throw new CustomError.UnauthenticatedError('Invalid credentials');
    }
    user.password = newPassword;
    const newUser =await user.save();
    res.status(StatusCodes.OK).json({msg : 'Password Updated Successfully'});
}


module.exports = {
    getAllUsers, getSingleUser, 
    showCurrentUser, updateUser, 
    updateUserPassword
}