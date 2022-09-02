const CustomError = require('../errors/index');

const checkPermissions = (requestUser, resourceUserId )=> requestUser.role === "admin"  || requestUser.userId ===  resourceUserId.toString() ;


module.exports = {
    checkPermissions
}