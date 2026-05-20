const express = require('express');
const {
  createResult,
  getAllResults,
  getMyResults,
  getDashboardStats,
  updateResult,
} = require('../controllers/resultController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('company'), createResult);
router.get('/stats/dashboard', protect, getDashboardStats);
router.get('/', protect, getAllResults);
router.get('/my-results', protect, authorize('student'), getMyResults);
router.put('/:id', protect, authorize('company'), updateResult);

module.exports = router;
