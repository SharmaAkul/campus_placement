const express = require('express');
const {
  getAllQuestions,
  getRandomQuestions,
  startTest,
  submitTest,
  getTestResult,
  getMyTests,
} = require('../controllers/aptitudeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/questions', protect, getAllQuestions);
router.get('/questions/random', protect, getRandomQuestions);
router.post('/start', protect, authorize('student'), startTest);
router.post('/submit', protect, authorize('student'), submitTest);
router.get('/result/:testId', protect, getTestResult);
router.get('/my-tests', protect, authorize('student'), getMyTests);

module.exports = router;
