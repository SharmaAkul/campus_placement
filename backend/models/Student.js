const mongoose = require('mongoose');
const { PLACEMENT_STATUS } = require('../config/constants');

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    enrollmentNumber: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    department: {
      type: String,
      enum: ['CSE', 'IT', 'ECE', 'ME', 'CE', 'EE'],
    },
    graduationYear: {
      type: Number,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },
    skills: [String],
    resumeLink: {
      type: String,
    },
    placementStatus: {
      type: String,
      enum: [PLACEMENT_STATUS.NOT_PLACED, PLACEMENT_STATUS.PLACED, PLACEMENT_STATUS.OFFER_RECEIVED],
      default: PLACEMENT_STATUS.NOT_PLACED,
    },
    placedCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      default: null,
    },
    package: {
      type: Number,
      default: 0,
    },
    profileCompletion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
