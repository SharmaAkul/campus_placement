import React, { useState, useEffect } from 'react';
import { aptitudeService } from '../services/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import './AptitudeTest.css';

const AptitudeTest = () => {
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (test && !submitted && timer > 0) {
      interval = setInterval(() => setTimer(timer - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer, test, submitted]);

  const startTest = async () => {
    setLoading(true);
    try {
      const response = await aptitudeService.startTest();
      setTest(response.data.test);
      setAnswers(new Array(response.data.test.questions.length).fill(null));
      setTimer(30 * 60); // 30 minutes
    } catch (error) {
      toast.error('Failed to start test');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: test.questions[currentQuestion]._id,
      selectedOptionIndex: optionIndex,
    };
    setAnswers(newAnswers);
  };

  const submitTest = async () => {
    setLoading(true);
    try {
      const response = await aptitudeService.submitTest(test._id, answers);
      setResult(response.data.test);
      setSubmitted(true);
      toast.success('Test submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit test');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !test) return <LoadingSpinner />;

  if (!test) {
    return (
      <div className="aptitude-container">
        <div className="test-intro">
          <h1>Aptitude Test Portal</h1>
          <p>Test your skills with our comprehensive aptitude assessment</p>
          <div className="test-info">
            <div className="info-item">
              <span className="info-icon">❓</span>
              <p><strong>10</strong> Questions</p>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <p><strong>30</strong> Minutes</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <p><strong>Auto</strong> Score Calculation</p>
            </div>
          </div>
          <button onClick={startTest} className="btn-start">
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="aptitude-container">
        <div className="test-result">
          <h1>Test Results</h1>
          <div className="result-card">
            <div className={`score-display ${result.percentage >= 60 ? 'pass' : 'fail'}`}>
              <h2>{result.percentage}%</h2>
              <p>{result.percentage >= 60 ? 'PASSED' : 'FAILED'}</p>
            </div>
            <div className="result-stats">
              <div className="stat">
                <p>Correct Answers</p>
                <h3>{result.correctAnswers}/{result.totalQuestions}</h3>
              </div>
              <div className="stat">
                <p>Score</p>
                <h3>{result.score} points</h3>
              </div>
              <div className="stat">
                <p>Status</p>
                <h3>Completed</h3>
              </div>
            </div>
          </div>
          <button onClick={() => window.location.reload()} className="btn-retake">
            Take Another Test
          </button>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="aptitude-container">
      <div className="test-header">
        <h2>Aptitude Test</h2>
        <div className="test-meta">
          <span>Question {currentQuestion + 1}/{test.questions.length}</span>
          <span className="timer">⏱️ {formatTime(timer)}</span>
        </div>
      </div>

      <div className="test-content">
        <div className="question-container">
          <h3>{question.question}</h3>
          <div className="options">
            {question.options.map((option, idx) => (
              <label key={idx} className="option">
                <input
                  type="radio"
                  name="answer"
                  checked={answers[currentQuestion]?.selectedOptionIndex === idx}
                  onChange={() => handleAnswerSelect(idx)}
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="test-navigation">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="btn-nav"
          >
            ← Previous
          </button>
          <div className="progress-indicator">
            {Array.from({ length: test.questions.length }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`progress-dot ${
                  idx === currentQuestion ? 'active' : answers[idx] ? 'answered' : ''
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          {currentQuestion < test.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="btn-nav"
            >
              Next →
            </button>
          ) : (
            <button onClick={submitTest} className="btn-submit-test">
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
