const CustomError = require('../errors/index');
const JwtUtils = require('../utils/jwt');
const authHandlerMiddleware = (req, res, next )=> {
    const token = req.signedCookies.token; 
    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    try {
        const {name , userId , email, role}= JwtUtils.isTokenValid({token});
        req.user = {name , userId , email, role}
        next();
    } catch (error) {
        throw  new CustomError.UnauthenticatedError('Authentication Invalid');
    }
}
const authorizePermissions= (...roles)=> {
    return (req, res , next )=> {
        if(!roles.includes(req.user.role)){
            throw  new CustomError.UnauthorizedError(`Unauthorized,role type: '${req.user.role}' does not have permission to access this route`);
        }
        next();
    }
}


module.exports =
{ authHandlerMiddleware,authorizePermissions };