const mongoose = require('mongoose');

const aptitudeQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['logical', 'quantitative', 'verbal'],
    },
    options: [
      {
        text: String,
        isCorrect: Boolean,
      },
    ],
    explanation: String,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
