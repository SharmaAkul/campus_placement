const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    package: Number,
    offerStatus: {
      type: String,
      enum: ['selected', 'rejected', 'pending'],
      default: 'pending',
    },
    joiningDate: Date,
    comments: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
