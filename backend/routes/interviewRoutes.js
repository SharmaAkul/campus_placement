const express = require('express');
const {
  scheduleInterview,
  getAllInterviews,
  getMyInterviews,
  getCompanyInterviews,
  updateInterview,
  cancelInterview,
} = require('../controllers/interviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('company'), scheduleInterview);
router.get('/', protect, getAllInterviews);
router.get('/my-interviews/list', protect, authorize('student'), getMyInterviews);
router.get('/company-interviews/list', protect, authorize('company'), getCompanyInterviews);
router.put('/:id', protect, authorize('company'), updateInterview);
router.delete('/:id', protect, authorize('company'), cancelInterview);

module.exports = router;
