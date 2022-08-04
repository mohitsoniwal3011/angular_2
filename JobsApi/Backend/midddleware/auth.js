const UnAuthorizedError = require("../error-handlers/Unauthorized");
const jwt = require('jsonwebtoken');
const authMiddleWare = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("auth header : ", authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnAuthorizedError('Not Authorized to access this route');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnAuthorizedError('Not Authorized to access this route');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = { userId: decoded.userId, name: decoded.name };
    } catch (error) {
        throw new UnAuthorizedError('Not Authorized to access this route');
    }
    next();
}

module.exports = authMiddleWare;