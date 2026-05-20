const AptitudeQuestion = require('../models/AptitudeQuestion');
const AptitudeTest = require('../models/AptitudeTest');
const Student = require('../models/Student');

// Get All Aptitude Questions
exports.getAllQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await AptitudeQuestion.find(filter);

    res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Random Aptitude Questions
exports.getRandomQuestions = async (req, res) => {
  try {
    const count = req.query.count || 10;

    const questions = await AptitudeQuestion.aggregate([
      { $sample: { size: parseInt(count) } },
    ]);

    res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Start Aptitude Test
exports.startTest = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const questions = await AptitudeQuestion.aggregate([
      { $sample: { size: 10 } },
    ]);

    const test = new AptitudeTest({
      studentId: student._id,
      questions: questions.map(q => q._id),
      totalQuestions: questions.length,
      startedAt: new Date(),
    });

    await test.save();

    const populatedTest = await test.populate('questions');

    res.status(201).json({ success: true, test: populatedTest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Submit Aptitude Test
exports.submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;

    const test = await AptitudeTest.findById(testId);

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    if (test.isCompleted) {
      return res.status(400).json({ success: false, message: 'Test already submitted' });
    }

    test.answers = answers;
    test.submittedAt = new Date();

    // Calculate score
    let correctCount = 0;
    for (let answer of answers) {
      const question = await AptitudeQuestion.findById(answer.questionId);
      if (question && question.options[answer.selectedOptionIndex]?.isCorrect) {
        correctCount++;
      }
    }

    test.correctAnswers = correctCount;
    test.score = correctCount;
    test.percentage = Math.round((correctCount / test.totalQuestions) * 100);
    test.isCompleted = true;

    await test.save();

    res.status(200).json({ success: true, test });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Test Result
exports.getTestResult = async (req, res) => {
  try {
    const test = await AptitudeTest.findById(req.params.testId)
      .populate('questions')
      .populate('studentId', 'enrollmentNumber');

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    res.status(200).json({ success: true, test });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Student's Tests
exports.getMyTests = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const tests = await AptitudeTest.find({ studentId: student._id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tests.length, tests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
