const express = require('express');
const router = express.Router();


const {
    getJobStatusList, 
    getJobTypeList,
    getUserProfile, updateUserProfile
} = require('../controllers/utility');

router.route('/job-status').get(getJobStatusList);
router.route('/job-type').get(getJobTypeList);
router.route('/:id').get(getUserProfile);
router.route('/update/:id').patch(updateUserProfile);

module.exports = router ;