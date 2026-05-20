const User = require('../models/User');
const Student = require('../models/Student');
const Company = require('../models/Company');
const { generateToken } = require('../utils/helpers');
const { ROLES } = require('../config/constants');

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || ROLES.STUDENT,
    });

    await user.save();

    // Create student profile if registering as student
    if (user.role === ROLES.STUDENT) {
      await Student.create({ userId: user._id });
    }

    // Create company profile if registering as company
    if (user.role === ROLES.COMPANY) {
      await Company.create({ userId: user._id, companyName: name });
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Current User
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    let userData = user.toJSON();

    if (user.role === ROLES.STUDENT) {
      const student = await Student.findOne({ userId: req.userId });
      userData.profile = student;
    } else if (user.role === ROLES.COMPANY) {
      const company = await Company.findOne({ userId: req.userId });
      userData.profile = company;
    }

    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout (Token invalidation handled on frontend)
exports.logout = async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
