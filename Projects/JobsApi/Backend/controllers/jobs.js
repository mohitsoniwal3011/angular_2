const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../error-handlers/bad-request');
const NotFoundError = require('../error-handlers/not-found');
const asyncWrapper = require('../midddleware/async');
const Job = require('../models/Job');

const getAllJobs = asyncWrapper(async  (req, res ) => {
    const allJobs = await Job.find({createdBy : req.user.userId}).sort('createdAt');
    res.status(200).json({
        nbHits : allJobs.length,
        jobs : allJobs
    })
});

const getSingleJob = asyncWrapper( async (req, res ) => {
    const jobId = req.params.id
    const userId = req.user.userId ; 
    
    const job = await Job.findOne({
        _id : jobId, createdBy : userId
    });
    if(!job){
        throw new NotFoundError(`Job with ${jobId} does not exist`)
    }
    res.status(StatusCodes.OK).json(job);
})

const createJob = asyncWrapper ( async (req, res ) => {
    req.body.createdBy = req.user.userId; 
    const jobCreated = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({
        jobCreated
    });
})

const deleteJob = asyncWrapper (async (req, res ) => {
    const jobId = req.params.id
    const userId = req.user.userId ; 
    const deletedUser = await Job.findByIdAndDelete({
        _id : jobId, createdBy : userId
    });
    if(!deletedUser){
        throw new NotFoundError(`Job with ${req.params.id} does not exist`)
    }
    res.status(StatusCodes.OK).json(deletedUser);
})

const updateJob  = asyncWrapper (async (req, res ) => {
    const jobId = req.params.id
    const userId = req.user.userId ; 
    const {position , company } = req.body
    console.log(req.body);
    const updatedUser = await Job.findOneAndUpdate({_id : jobId, createdBy : userId}, req.body, {
        runValidators: true, new : true
    });
    if(!position || !company){
        throw new BadRequestError('position or company can not be empty ')
    }
    if(!updatedUser){
        throw new NotFoundError(`Job with ${req.params.id} does not exist`)
    }
    res.status(StatusCodes.OK).json(updatedUser);
})

module.exports = {
    getAllJobs, getSingleJob, 
    createJob, deleteJob, updateJob
}



