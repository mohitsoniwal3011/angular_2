const express = require('express');
const router = express.Router();
const{ 
    authHandlerMiddleware, 
authorizePermissions }= require('../middleware/authentication');

const {
    getAllUsers, getSingleUser, 
    showCurrentUser, updateUser, 
    updateUserPassword
} = require('../controller/user')


router.route('/').get( authHandlerMiddleware,authorizePermissions('admin'), getAllUsers);
router.route('/showMe').get(authHandlerMiddleware,showCurrentUser);
router.route('/updateUser').patch(authHandlerMiddleware, updateUser);
router.route('/updateUserPassword').patch(authHandlerMiddleware, updateUserPassword);
router.route('/:id').get(authHandlerMiddleware,getSingleUser);

module.exports = router;