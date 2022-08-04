const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');


const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        maxlength : [30, 'name can not be more than 30 cheractors'],
        required : [true, 'must provide a name'],
        trim : true,
        unique : true
    },
    completed : {
        type: Boolean, 
        default : false 
    }
});

module.exports = mongoose.model('Task', TaskSchema)