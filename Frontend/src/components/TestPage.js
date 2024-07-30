import React, { useState, useEffect } from 'react';
import './TestPage.css';

const TestPage = () => {
  const testDetails = {
    "title": "Czz",
    "passingScore": "20",
    "duration": "10", // Duration in minutes
    "startTime": "2024-07-31T01:39",
    "endTime": "2024-07-31T02:39",
    "category": "ccc",
    "description": "dcwcddw",
    "questions": [
      {
        "type": "true-false",
        "points": "2",
        "text": "You name",
        "options": ["true", "false"],
        "correctOption": "true"
      },
      {
        "type": "fill-in-the-blank",
        "points": "2",
        "text": "Apple is a _________",
        "options": [""],
        "correctAnswer": "fruit"
      }
    ]
  };

  const getRemainingTime = () => {
    const storedTime = localStorage.getItem('timeLeft');
    return storedTime ? parseInt(storedTime, 10) : testDetails.duration * 60; // Default to duration if no stored time
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isExamAccessible, setIsExamAccessible] = useState(true);

  useEffect(() => {
    // Check if the current time is within the allowed exam period
    const now = new Date();
    const startTime = new Date(testDetails.startTime);
    const endTime = new Date(testDetails.endTime);
    setIsExamAccessible(now >= startTime && now <= endTime);

    if (isExamAccessible) {
      // Timer logic
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime > 0 ? prevTime - 1 : 0;
          localStorage.setItem('timeLeft', newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isExamAccessible]);

  useEffect(() => {
    // Calculate score whenever userAnswers or questions change
    calculateScore();
  }, [userAnswers]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleQuestionChange = (index) => {
    if (index >= 0 && index < (testDetails?.questions?.length || 0)) {
      setCurrentQuestionIndex(index);
    }
  };

  const calculateScore = () => {
    const correctAnswers = testDetails.questions.reduce((totalPoints, question, index) => {
      const userAnswer = userAnswers[index];
      if (question.type === 'multiple-choice' && userAnswer === question.correctOption) {
        return totalPoints + parseInt(question.points);
      }
      if (question.type === 'true-false' && userAnswer === question.correctOption) {
        return totalPoints + parseInt(question.points);
      }
      if (question.type === 'fill-in-the-blank' && userAnswer === question.correctAnswer) {
        return totalPoints + parseInt(question.points);
      }
      return totalPoints;
    }, 0);

    setScore(correctAnswers);
  };

  const currentQuestion = testDetails?.questions?.[currentQuestionIndex] || {};

  if (!isExamAccessible) {
    return (
      <div className="container">
        <h1>The exam is not accessible at this time.</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>{testDetails?.title || 'Test'}</h1>
        <button className="exitButton">Exit Full Screen</button>
      </header>

      <div className="content">
        <div className="questionArea">
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>

          <div className="questionDisplay">
            <h2>Question No. {currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.text || 'No question available'}</p>

            {currentQuestion.type === 'multiple-choice' && (
              <div className="options">
                {(currentQuestion.options || []).map((option, index) => (
                  <label key={index} className="option">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={userAnswers[currentQuestionIndex] === option}
                      onChange={() => handleAnswerChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true-false' && (
              <div className="options">
                {(currentQuestion.options || []).map((option, index) => (
                  <label key={index} className="option">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={userAnswers[currentQuestionIndex] === option}
                      onChange={() => handleAnswerChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'fill-in-the-blank' && (
              <input
                type="text"
                value={userAnswers[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="input"
              />
            )}
          </div>

          <div className="actionButtons">
            <button className="button">Mark for Review & Next</button>
            <button className="button">Clear Response</button>
            <button className="button">Save & Next</button>
            <button className="submitButton" onClick={() => alert(`Your score is ${score}`)}>Submit Test</button>
          </div>
        </div>

        <div className="sidePanel">
          <div className="userInfo">
            <div className="avatar">{testDetails?.username?.[0] || 'U'}</div>
            <span>{testDetails?.username || 'User'}</span>
          </div>

          <div className="navigationPanel">
            <h3>SECTION: Test</h3>
            <div className="questionGrid">
              {[...Array(testDetails?.questions?.length || 0)].map((_, index) => (
                <button
                  key={index}
                  className={`questionButton ${index === currentQuestionIndex ? 'activeQuestion' : ''}`}
                  onClick={() => handleQuestionChange(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
