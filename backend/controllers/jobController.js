const Job = require('../models/Job');
const Company = require('../models/Company');

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { jobTitle, description, package, location, department, minCGPA, maxCGPA, requiredSkills, interviewDate, interviewMode } = req.body;

    const company = await Company.findOne({ userId: req.userId });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }

    const job = new Job({
      companyId: company._id,
      jobTitle,
      description,
      package,
      location,
      department: department || [],
      minCGPA: minCGPA || 0,
      maxCGPA: maxCGPA || 10,
      requiredSkills: requiredSkills || [],
      interviewDate,
      interviewMode: interviewMode || 'online',
    });

    await job.save();

    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { companyId, department, minPackage } = req.query;

    let filter = { isActive: true };
    if (companyId) filter.companyId = companyId;
    if (department) filter.department = department;
    if (minPackage) filter.package = { $gte: parseFloat(minPackage) };

    const jobs = await Job.find(filter).populate('companyId', 'companyName location');

    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Job
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'companyName location hrEmail')
      .populate('applicants', 'enrollmentNumber');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const { jobTitle, description, package, location, minCGPA, maxCGPA, requiredSkills, interviewDate, isActive } = req.body;

    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Verify ownership
    const company = await Company.findOne({ userId: req.userId });
    if (job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this job' });
    }

    if (jobTitle) job.jobTitle = jobTitle;
    if (description) job.description = description;
    if (package) job.package = package;
    if (location) job.location = location;
    if (minCGPA !== undefined) job.minCGPA = minCGPA;
    if (maxCGPA !== undefined) job.maxCGPA = maxCGPA;
    if (requiredSkills) job.requiredSkills = requiredSkills;
    if (interviewDate) job.interviewDate = interviewDate;
    if (isActive !== undefined) job.isActive = isActive;

    await job.save();

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Verify ownership
    const company = await Company.findOne({ userId: req.userId });
    if (job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Apply for Job
exports.applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const Student = require('../models/Student');
    const student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    if (job.applicants.includes(student._id)) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    job.applicants.push(student._id);
    await job.save();

    res.status(200).json({ success: true, message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
