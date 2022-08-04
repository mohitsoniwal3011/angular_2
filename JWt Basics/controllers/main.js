const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken');

const login = (req, res )=> {
    const {username , password } = req.body;
    if(!username  || !password){
        throw new CustomAPIError('Please provide correct values', 400);
    }
    //id for demo purpose since we have not  connected to database'
    const id = new Date().getTime();
    const token = jwt.sign({id,username}, process.env.JWT_SECRET, {expiresIn:'30d'});
    res.status(200).json({msg : 'user created', token})
}


const dashBoard = (req, res) => {
    console.log(req.headers);
    res.status(200).json({
        msg :  `Welcome Back ${req.user.username}`, 
        secret  : `Your lucky number is : ${Math.floor(Math.random()*100)}`
    })
}
module.exports = {
    login,
    dashBoard
}