const mongoose = require('mongoose');

const aptitudeTestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AptitudeQuestion',
      },
    ],
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        selectedOptionIndex: Number,
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: Number,
    correctAnswers: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    startedAt: Date,
    submittedAt: Date,
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AptitudeTest', aptitudeTestSchema);
