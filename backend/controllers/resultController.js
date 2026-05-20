const Result = require('../models/Result');
const Student = require('../models/Student');
const Company = require('../models/Company');
const Interview = require('../models/Interview');

// Create Result
exports.createResult = async (req, res) => {
  try {
    const { studentId, jobId, package, offerStatus, joiningDate, comments } = req.body;

    const company = await Company.findOne({ userId: req.userId });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }

    const result = new Result({
      studentId,
      companyId: company._id,
      jobId,
      package,
      offerStatus: offerStatus || 'pending',
      joiningDate,
      comments,
    });

    await result.save();

    // Update student placement status if selected
    if (offerStatus === 'selected') {
      await Student.findByIdAndUpdate(
        studentId,
        {
          placementStatus: 'placed',
          placedCompany: company._id,
          package,
        },
        { new: true }
      );
    }

    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Results
exports.getAllResults = async (req, res) => {
  try {
    const { studentId, companyId, offerStatus } = req.query;

    let filter = {};
    if (studentId) filter.studentId = studentId;
    if (companyId) filter.companyId = companyId;
    if (offerStatus) filter.offerStatus = offerStatus;

    const results = await Result.find(filter)
      .populate('studentId', 'enrollmentNumber')
      .populate('companyId', 'companyName')
      .populate('jobId', 'jobTitle');

    res.status(200).json({ success: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Student's Results
exports.getMyResults = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const results = await Result.find({ studentId: student._id })
      .populate('companyId', 'companyName')
      .populate('jobId', 'jobTitle package');

    res.status(200).json({ success: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const placedStudents = await Student.countDocuments({ placementStatus: 'placed' });
    const companies = await Company.countDocuments();
    const upcomingInterviews = await Interview.countDocuments({
      status: 'scheduled',
      interviewDate: { $gte: new Date() },
    });

    const placementStats = await Student.aggregate([
      {
        $match: { placementStatus: 'placed' },
      },
      {
        $group: {
          _id: '$placedCompany',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: '_id',
          foreignField: '_id',
          as: 'company',
        },
      },
    ]);

    const departmentStats = await Student.aggregate([
      {
        $group: {
          _id: '$department',
          total: { $sum: 1 },
          placed: {
            $sum: {
              $cond: [{ $eq: ['$placementStatus', 'placed'] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        placedStudents,
        companies,
        upcomingInterviews,
        placementStats,
        departmentStats,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Result
exports.updateResult = async (req, res) => {
  try {
    const { offerStatus, package, joiningDate, comments } = req.body;

    let result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }

    if (offerStatus) result.offerStatus = offerStatus;
    if (package) result.package = package;
    if (joiningDate) result.joiningDate = joiningDate;
    if (comments) result.comments = comments;

    await result.save();

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
