const express = require('express');
const router = express.Router();
const {authHandlerMiddleware} = require('../middleware/authentication')
const {
    createReview, getAllReviews, getSingleReview, updateReview, deleteReview
} = require('../controller/review')


router.route('/').get(getAllReviews).post(authHandlerMiddleware, createReview);
router.route('/:id').get(getSingleReview).patch(authHandlerMiddleware, updateReview).delete(authHandlerMiddleware, deleteReview);

module.exports = router