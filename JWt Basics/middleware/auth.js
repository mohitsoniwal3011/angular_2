const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken');

const authMiddleware =async  (req, res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided ', 401);
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id, username}
        next();
    } catch (error) {
        console.log(error);
        throw new CustomAPIError('Not authorized to acceess this route',401);
    }
}

module.exports = authMiddleware