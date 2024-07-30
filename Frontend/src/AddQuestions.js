import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import "./AddQuestions.css";


const AddQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState(location.state?.testDetails || {
    title: '',
    passingScore: '',
    duration: '',
    startTime: '',
    endTime: '',
    category: '',
    description: '',
    questions: []
  });

  const [showModal, setShowModal] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [points, setPoints] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctOption, setCorrectOption] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(testDetails.questions.length + 1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Updated testDetails:", JSON.stringify(testDetails, null, 2));
  }, [testDetails]);

  const validateForm = () => {
    const newErrors = {};
    if (!questionType) newErrors.questionType = "Question type is required";
    if (!points) newErrors.points = "Points are required";
    if (!questionText) newErrors.questionText = "Question text is required";
    if (questionType === "multiple-choice") {
      if (options.some(option => option === "")) newErrors.options = "All options must be filled";
      if (!correctOption) newErrors.correctOption = "Correct option is required";
    }
    if (questionType === "true-false" && !correctOption) newErrors.correctOption = "Correct answer is required";
    if (questionType === "fill-in-the-blank" && !correctAnswer) newErrors.correctAnswer = "Correct answer is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuestion = () => {
    setShowModal(true);
  };

  const handleSaveQuestion = () => {
    if (!validateForm()) return;

    let newQuestion = {
      type: questionType,
      points,
      text: questionText,
      options: [],
      correctOption: questionType === "multiple-choice" || questionType === "true-false" ? correctOption : undefined,
      correctAnswer: questionType === "fill-in-the-blank" ? correctAnswer : undefined,
    };

    if (questionType === "multiple-choice") {
      newQuestion.options = options.filter(option => option !== "");
    } else if (questionType === "true-false") {
      newQuestion.options = ["true", "false"];
    } else if (questionType === "fill-in-the-blank") {
      newQuestion.options = [""];
    }

    const updatedQuestions = [...testDetails.questions, newQuestion];
    
    setTestDetails({ ...testDetails, questions: updatedQuestions });

    setShowModal(false);
    setQuestionType("");
    setPoints("");
    setQuestionText("");
    setOptions([""]);
    setCorrectOption("");
    setCorrectAnswer("");
    setQuestionNumber(updatedQuestions.length + 1);
    setErrors({});
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleNavigateToDetails = () => {
    navigate('/create-test', { state: { testDetails } });
  };

  return (
    <div className="create-test">
      <h2>Create Test</h2>

      <div className="test-details-page">
        <div className="header">
          <h1>{testDetails.title}</h1>
          <p className="category">{testDetails.category}</p>
        </div>
        <div className="test-info">
          <p><strong>Description:</strong> {testDetails.description}</p>
          <p><strong>Duration:</strong> {testDetails.duration} minutes</p>
          <p><strong>Start Time:</strong> {new Date(testDetails.startTime).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(testDetails.endTime).toLocaleString()}</p>
          <p><strong>Passing Score:</strong> {testDetails.passingScore}</p>
        </div>

        <Button onClick={handleAddQuestion}>Add Question</Button>
        
        {testDetails.questions.length > 0 && (
          <div className="questions">
            <h2>Questions</h2>
            {testDetails.questions.map((question, index) => (
              <div key={index} className="question">
                <p><strong>Question {index + 1}:</strong> {question.text}</p>
                <p><strong>Points:</strong> {question.points}</p>
                {question.type === 'multiple-choice' && (
                  <div className="options">
                    <p><strong>Options:</strong></p>
                    <ul>
                      {question.options.map((option, idx) => (
                        <li key={idx} className={option === question.correctOption ? 'correct-option' : ''}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {question.type === 'true-false' && (
                  <div className="true-false">
                    <p><strong>Correct Answer:</strong> {question.correctOption}</p>
                  </div>
                )}
                {question.type === 'fill-in-the-blank' && (
                  <div className="fill-in-the-blank">
                    <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Question (Q.{questionNumber})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label>Question Type</label>
              <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-in-the-blank">Fill in the Blank</option>
              </select>
              {errors.questionType && <p className="error">{errors.questionType}</p>}
            </div>
            <div>
              <label>Points</label>
              <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
              {errors.points && <p className="error">{errors.points}</p>}
            </div>
            <div>
              <label>Question</label>
              <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
              {errors.questionText && <p className="error">{errors.questionText}</p>}
            </div>
            {questionType === "multiple-choice" && (
              <div>
                <label>Options</label>
                {options.map((option, index) => (
                  <div key={index} className="option-item">
                    <span>{String.fromCharCode(65 + index)}.</span>
                    <input type="text" value={option} onChange={(e) => handleOptionChange(index, e)} />
                    <button type="button" onClick={() => handleRemoveOption(index)}>X</button>
                  </div>
                ))}
                <Button onClick={handleAddOption}>Add Option</Button>
                {errors.options && <p className="error">{errors.options}</p>}
                <div>
                  <label>Correct Option</label>
                  <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
                    <option value="">Select Correct Option</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{String.fromCharCode(65 + index)}</option>
                    ))}
                  </select>
                  {errors.correctOption && <p className="error">{errors.correctOption}</p>}
                </div>
              </div>
            )}
            {questionType === "true-false" && (
              <div>
                <label>Correct Answer</label>
                <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
                  <option value="">Select Correct Answer</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                {errors.correctOption && <p className="error">{errors.correctOption}</p>}
              </div>
            )}
            {questionType === "fill-in-the-blank" && (
              <div>
                <label>Correct Answer</label>
                <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
                {errors.correctAnswer && <p className="error">{errors.correctAnswer}</p>}
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveQuestion}>Save Question</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddQuestions;
