const Company = require('../models/Company');
const Job = require('../models/Job');
const User = require('../models/User');

// Get Company Profile
exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.userId }).populate('userId', 'name email');

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Company Profile
exports.updateCompanyProfile = async (req, res) => {
  try {
    const { companyName, website, description, location, hrEmail, hrPhone } = req.body;

    let company = await Company.findOne({ userId: req.userId });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }

    if (companyName) company.companyName = companyName;
    if (website) company.website = website;
    if (description) company.description = description;
    if (location) company.location = location;
    if (hrEmail) company.hrEmail = hrEmail;
    if (hrPhone) company.hrPhone = hrPhone;

    await company.save();

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate('userId', 'name email')
      .select('-hrPhone -hrEmail');

    res.status(200).json({ success: true, count: companies.length, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Company
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('userId', 'name email');

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
