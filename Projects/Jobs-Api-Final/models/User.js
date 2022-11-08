const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
    name : {
        type : String, 
        required : [true,'Please provide a name'], 
        minLength : [3, 'Name should have atleast 3 characters'],
        maxLength : [50, 'Name can not be more then 50 characters'],
    }, 
    email : {
        type : String, 
        required : [true,'Please provide an email'], 
        match : [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,'please provide a valid email'], 
        unique : true
    }, 
    password : {
        type : String, 
        required : [true,'Please provide a password'], 
        minLength : [3, 'password must have atleast 6 characters'],
    }, 
    lastname : {
        type : String , 
        default : 'Last Name'
    }, 
    location : {
        type : String , 
        default : 'my location'
    }
})

// UserSchema.pre('save' , async function(next){
//     const salt =await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

// below one and above one function exactly the same 
UserSchema.pre('save' , async function(){
    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


UserSchema.methods.generateToken = function() {
    return  jwt.sign({
        userId : this._id,
    }, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_LIFETIME
    });
}


UserSchema.methods.comparePassword =async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);