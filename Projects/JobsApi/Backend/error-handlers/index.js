const UnAuthorizedError  = require('./Unauthorized');
const  BadRequestError  = require('./bad-request');
const  CustomAPIError  = require('./coutom-error');
const NotFoundError = require('./not-found')
module.exports = {
    UnAuthorizedError, BadRequestError, CustomAPIError, NotFoundError
}