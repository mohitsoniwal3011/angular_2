const { use } = require('express/lib/router');
const jwt = require('jsonwebtoken');

const createJWT = ({payload}) => {
    const token =jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn : process.env.JWT_LIFETIME
    });
    return token;
}

const isTokenValid = ({token})=> jwt.verify(token, process.env.SECRET_KEY);

const attachCookiesToResponse  = ({res,user}) => {
    const token = createJWT({payload : user});
    const oneDay = 1000*60*60*24;
    res.cookie('token', token , {
        httpOnly : true, 
        expires : new Date(Date.now() + oneDay), 
        secure : process.env.NODE_ENV  === 'production', 
        signed : true
    })
}

const createToken = ({user})=> {
    return {userId : user.userId,name : user.name , email : user.email, role : user.password }
}
module.exports = {
    createJWT, isTokenValid, attachCookiesToResponse
};