const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    description: String,
    package: {
      type: Number,
      required: true,
    },
    location: String,
    department: [String],
    minCGPA: {
      type: Number,
      default: 0,
    },
    maxCGPA: {
      type: Number,
      default: 10,
    },
    requiredSkills: [String],
    interviewDate: Date,
    interviewMode: {
      type: String,
      enum: ['online', 'offline'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
