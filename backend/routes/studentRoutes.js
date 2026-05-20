const express = require('express');
const { getProfile, updateProfile, getAllStudents, getStudent } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, authorize('student'), getProfile);
router.put('/profile', protect, authorize('student'), updateProfile);
router.get('/', protect, authorize('company', 'admin'), getAllStudents);
router.get('/:id', protect, getStudent);

module.exports = router;
