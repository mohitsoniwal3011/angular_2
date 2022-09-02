const mongoose = require('mongoose');
const validatorPackage = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide a name'],
        minLength : [3, 'name can not be less then 3 charaters'],
        maxLength : [20, 'name can not be more then 20 characters']
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true, 
        validate : {
            message : 'Please provide a valid email', 
            validator : validatorPackage.isEmail
        }
    }, 
    password : {
        type : String,
        required : [true, 'please provide a password'], 
        minLength : [6, 'password can not be less then 8 charaters']
    }, 
    role :{
        type : String , 
        enum : ['admin', 'user'], 
        default : 'user'
    }
})

UserSchema.pre('save',async function(){
    // console.log(this.modifiedPaths());
    if(!this.isModified('password')) {
        return;
    }
    const salt =await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
})

UserSchema.methods.comparePasswords = async function(userPassword){
    const isMatch =await bcrypt.compare(userPassword, this.password);
    return isMatch;
}



module.exports = new mongoose.model('User', UserSchema)