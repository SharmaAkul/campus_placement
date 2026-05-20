const mongoose = require('mongoose');
const { INTERVIEW_STATUS, INTERVIEW_MODE } = require('../config/constants');

const interviewSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    interviewDate: {
      type: Date,
      required: true,
    },
    interviewTime: String,
    interviewMode: {
      type: String,
      enum: [INTERVIEW_MODE.ONLINE, INTERVIEW_MODE.OFFLINE],
      default: INTERVIEW_MODE.ONLINE,
    },
    meetingLink: String,
    location: String,
    status: {
      type: String,
      enum: [INTERVIEW_STATUS.SCHEDULED, INTERVIEW_STATUS.COMPLETED, INTERVIEW_STATUS.CANCELLED, INTERVIEW_STATUS.PENDING],
      default: INTERVIEW_STATUS.SCHEDULED,
    },
    result: {
      type: String,
      enum: ['pass', 'fail', 'pending'],
      default: 'pending',
    },
    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
