const express = require('express');
const { createJob, getAllJobs, getJob, updateJob, deleteJob, applyForJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('company'), createJob);
router.get('/', protect, getAllJobs);
router.get('/:id', protect, getJob);
router.put('/:id', protect, authorize('company'), updateJob);
router.delete('/:id', protect, authorize('company'), deleteJob);
router.post('/:jobId/apply', protect, authorize('student'), applyForJob);

module.exports = router;
