const express =  require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    login, 
    dashBoard
} = require('../controllers/main');

router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware,dashBoard);

module.exports = router;