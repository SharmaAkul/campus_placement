const express = require('express');
const { getCompanyProfile, updateCompanyProfile, getAllCompanies, getCompany } = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, authorize('company'), getCompanyProfile);
router.put('/profile', protect, authorize('company'), updateCompanyProfile);
router.get('/', protect, getAllCompanies);
router.get('/:id', protect, getCompany);

module.exports = router;
