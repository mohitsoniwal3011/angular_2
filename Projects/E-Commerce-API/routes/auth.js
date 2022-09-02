const express = require('express');
const router = express.Router();
const {
    logInUser, logOutUser, registerUser
} = require('../controller/auth')

router.route('/login').post(logInUser);
router.route('/logout').get(logOutUser);
router.route('/register').post(registerUser);

module.exports = router;