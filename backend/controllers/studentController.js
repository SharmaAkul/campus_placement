const Student = require('../models/Student');
const User = require('../models/User');
const { calculateProfileCompletion } = require('../utils/helpers');

// Get Student Profile
exports.getProfile = async (req, res) => {
  try {
    let student = await Student.findOne({ userId: req.userId }).populate('userId', 'name email');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    student.profileCompletion = calculateProfileCompletion(student);
    await student.save();

    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Student Profile
exports.updateProfile = async (req, res) => {
  try {
    const { phone, department, graduationYear, cgpa, skills, resumeLink, enrollmentNumber } = req.body;

    let student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    if (phone) student.phone = phone;
    if (department) student.department = department;
    if (graduationYear) student.graduationYear = graduationYear;
    if (cgpa !== undefined) student.cgpa = cgpa;
    if (skills) student.skills = skills;
    if (resumeLink) student.resumeLink = resumeLink;
    if (enrollmentNumber) student.enrollmentNumber = enrollmentNumber;

    student.profileCompletion = calculateProfileCompletion(student);
    await student.save();

    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Students (for company recruitment)
exports.getAllStudents = async (req, res) => {
  try {
    const { department, cgpa } = req.query;

    let filter = {};
    if (department) filter.department = department;
    if (cgpa) filter.cgpa = { $gte: parseFloat(cgpa) };

    const students = await Student.find(filter)
      .populate('userId', 'name email')
      .populate('placedCompany', 'companyName');

    res.status(200).json({ success: true, count: students.length, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('placedCompany', 'companyName');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
