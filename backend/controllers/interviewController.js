const Interview = require('../models/Interview');
const Company = require('../models/Company');
const Student = require('../models/Student');

// Schedule Interview
exports.scheduleInterview = async (req, res) => {
  try {
    const { studentId, jobId, interviewDate, interviewTime, interviewMode, meetingLink, location } = req.body;

    const company = await Company.findOne({ userId: req.userId });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }

    const interview = new Interview({
      studentId,
      companyId: company._id,
      jobId,
      interviewDate,
      interviewTime,
      interviewMode: interviewMode || 'online',
      meetingLink: interviewMode === 'online' ? meetingLink : null,
      location: interviewMode === 'offline' ? location : null,
    });

    await interview.save();

    res.status(201).json({ success: true, interview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Interviews
exports.getAllInterviews = async (req, res) => {
  try {
    const { studentId, companyId, status } = req.query;

    let filter = {};
    if (studentId) filter.studentId = studentId;
    if (companyId) filter.companyId = companyId;
    if (status) filter.status = status;

    const interviews = await Interview.find(filter)
      .populate('studentId', 'enrollmentNumber')
      .populate('companyId', 'companyName')
      .populate('jobId', 'jobTitle')
      .sort({ interviewDate: 1 });

    res.status(200).json({ success: true, count: interviews.length, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Student's Interviews
exports.getMyInterviews = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const interviews = await Interview.find({ studentId: student._id })
      .populate('companyId', 'companyName location')
      .populate('jobId', 'jobTitle package')
      .sort({ interviewDate: 1 });

    res.status(200).json({ success: true, count: interviews.length, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company's Scheduled Interviews
exports.getCompanyInterviews = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.userId });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }

    const interviews = await Interview.find({ companyId: company._id })
      .populate('studentId', 'enrollmentNumber')
      .populate('jobId', 'jobTitle')
      .sort({ interviewDate: 1 });

    res.status(200).json({ success: true, count: interviews.length, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Interview
exports.updateInterview = async (req, res) => {
  try {
    const { status, result, remarks, interviewDate, interviewTime } = req.body;

    let interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    if (status) interview.status = status;
    if (result) interview.result = result;
    if (remarks) interview.remarks = remarks;
    if (interviewDate) interview.interviewDate = interviewDate;
    if (interviewTime) interview.interviewTime = interviewTime;

    await interview.save();

    res.status(200).json({ success: true, interview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel Interview
exports.cancelInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    res.status(200).json({ success: true, interview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
