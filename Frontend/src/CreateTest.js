import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopUp from './PopUp'; // Import the PopUp component
import './CreateTest.css'; // Import CSS for the CreateTest page

function CreateTest() {
  const [testName, setTestName] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', ''], correctOption: 0 }]);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''], correctOption: 0 }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/tests', {
        testName,
        duration,
        questions
      });
      alert('Test created successfully!');
      navigate('/take-test', { state: { testId: response.data.id } });
    } catch (error) {
      console.error('There was an error creating the test!', error);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="container create-test-container">
      <h2 className="text-center my-4">Create Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row mb-3">
          <div className="col-md-6">
            <label>Exam Name</label>
            <input
              type="text"
              placeholder="Enter the Exam Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label>Duration (minutes)</label>
            <input
              type="number"
              placeholder="Enter the Exam Duration (in minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="form-group mb-4 card p-3">
            <h4>Question {qIndex + 1}</h4>
            <div className="d-flex align-items-center mb-2 question-input">
              <input
                type="text"
                placeholder="Enter the Question"
                name="question"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                className="form-control mb-2"
              />
              <button type="button" onClick={() => removeQuestion(qIndex)} className="btn btn-danger btn-sm ms-2">
                Remove
              </button>
            </div>
            <div className="options-container">
              <div className="left align-items-center mb-2">
                <label>Options</label>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="d-flex align-items-center mb-2 option-input">
                    <label>{` ${oIndex + 1}). `}</label>
                    <input
                      type="text"
                      placeholder="Enter the options"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(qIndex, oIndex)}
                      className="btn btn-danger btn-sm ms-2"
                      id="remove-option-button"
                    >
                      Remove Option
                    </button>
                  </div>
                ))}
              </div>
              <div className="right justify-content-between mt-2">
                <button
                  type="button"
                  onClick={() => addOption(qIndex)}
                  className="btn btn-primary btn-sm add-option-button"
                >
                  Add Option
                </button>
                <div className="form-group correct-option" id="correct-option">
                  <label className="lable-correct-option">Choose Correct Option</label>
                  <select
                    value={q.correctOption}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, {
                        target: { name: 'correctOption', value: parseInt(e.target.value) },
                      })
                    }
                    className="form-control"
                    id="choose-option"
                  >
                    {q.options.map((_, index) => (
                      <option key={index} value={index}>{`Option ${index + 1}`}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="btn btn-secondary">
          Add Question
        </button>
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Submit Test
          </button>
          <button type="button" onClick={handlePreview} className="btn btn-secondary btn-lg">
            Preview Test
          </button>
        </div>
      </form>

      <PopUp show={showPreview} onClose={() => setShowPreview(false)}>
        <div className="modal-content">
          <div className="popup-header">
            <h5 className="modal-title">{testName}</h5>
            {/* <h5>{testName}</h5> */}
            
            <button className="popup-close" onClick={() => setShowPreview(false)}>×</button>
          </div>
          <div className="modal-body">
          <p>Duration: {duration} minutes</p>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-3">
                <h5>{`Q${qIndex + 1}: ${q.question}`}</h5>
                <ol type='a'>
                  {q.options.map((option, oIndex) => (
                    <li key={oIndex}>
                       {option}
                    </li>
                  ))}
                </ol>
                <p>Correct Answer: {String.fromCharCode(97 + q.correctOption)}</p>
              </div>
            ))}
          </div>
        </div>
      </PopUp>
    </div>
  );
}

export default CreateTest;
