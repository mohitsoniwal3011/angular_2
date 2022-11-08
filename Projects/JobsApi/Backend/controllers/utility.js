const asyncWrapper = require("../midddleware/async");
const Job = require("../models/Job");
const User = require("../models/User");
const BadRequestError = require('../error-handlers/bad-request');
const { StatusCodes} = require('http-status-codes');
const getJobTypeList = (req, res ) => {
    try {
        res.status(200).json(Job.schema.obj.jobtype.enum);
    } catch (error) {
        console.log(error);
    }
}


const getJobStatusList = (req, res) => {
    try {
        res.status(200).json(Job.schema.obj.status.enum);
    } catch (error) {
        console.log(error);
    }
}


const getUserProfile = asyncWrapper (  async (req, res ) => {
    const profile =  await User.findById(req.params.id);
    const response = {
        name : profile.name, 
        email : profile.email, 
        lastname : profile.lastname , 
        location : profile.location 
    } 
    res.status(200).json(response);
})

const updateUserProfile = asyncWrapper(async (req, res )=> {
    const userId = req.params.id;
    if(!req.body.name || !req.body.email){
        throw new BadRequestError('Name and email can not be empty');
    }
    if(!req.body.lastname){
        req.body.lastname = 'last name'
    }
    if(!req.body.location){
        req.body.location = 'London'
    }
    const newUser = await User.findOneAndUpdate({
        _id : userId
    }, req.body, {
        runValidators : true, new : true
    });
    const {name , email, lastname , location } = newUser
    res.status(StatusCodes.CREATED).json({name , email, lastname , location } );
})

module.exports = {
    getJobStatusList , 
    getJobTypeList, 
    getUserProfile, 
    updateUserProfile
}