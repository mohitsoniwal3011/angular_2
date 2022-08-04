const { StatusCodes} = require('http-status-codes');
const User =  require('../models/User')
const asyncWrapper = require('../midddleware/async');
const BadRequestError = require('../error-handlers/bad-request');
const UnAuthorizedError = require('../error-handlers/Unauthorized');

const register = asyncWrapper( async (req, res ) => {
    const createdUser = await User.create({...req.body});
    const token = createdUser.generateToken()
    res.status(StatusCodes.CREATED).json({user : {name : createdUser.name},token });
})

const login= asyncWrapper (async (req, res ) => {
    const {email , password } =  req.body;
    if(!email || !password ){
        throw new BadRequestError('please provide email and password');
    }
    const user = await User.findOne({email : email});
    if(!user){
       throw new UnAuthorizedError('Invalid credentials')
    }
    if(await user.comparePassword(password)){
        return res.status(StatusCodes.OK).json({     
            user  : {name : user.name} ,
            token : user.generateToken()
        });
    }
    else {
        throw new UnAuthorizedError('Wrong Password Entered');
    }
})


module.exports = {
    register, login
}