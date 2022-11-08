const mongoose = require('mongoose');
const JobsSchema = mongoose.Schema({
    position : {
        type : String , 
        required : [true , 'Position is required'], 
    }, 
    company : {
        type : String ,
        required : [true, 'company is required'], 
    },
    joblocation : {
        type : String , 
        default : 'my city',
    }, 
    status : {
        type : String , 
        enum : ['interview', 'declined', 'pending'], 
        default : 'pending'
    }, 
    jobtype : {
        type : String, 
        enum : ['full-time', 'part-time', 'remote','internship'],
        default : 'full-time'
    }, 
    createdBy : {
        type : mongoose.Types.ObjectId, 
        ref : 'User', 
        required : [true , 'please provide a user']
    }
}, {timestamps : true})


module.exports = mongoose.model('Job',JobsSchema);