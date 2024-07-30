import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const QuestionForm = () => {
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [options, setOptions] = useState(['']);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    setOptions(['']);
    setCorrectAnswers([]);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.slice();
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    const newCorrectAnswers = correctAnswers.slice();
    if (newCorrectAnswers.includes(index)) {
      newCorrectAnswers.splice(newCorrectAnswers.indexOf(index), 1);
    } else {
      newCorrectAnswers.push(index);
    }
    setCorrectAnswers(newCorrectAnswers);
  };

  return (
    <Form>
      <Form.Group controlId="questionType">
        <Form.Label>Question Type</Form.Label>
        <Form.Control as="select" value={questionType} onChange={handleQuestionTypeChange}>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="fill-in-the-blank">Fill in the Blanks</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="questionText">
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" placeholder="Enter question text" />
      </Form.Group>

      {questionType === 'multiple-choice' && (
        <div>
          <Form.Label>Options</Form.Label>
          {options.map((option, index) => (
            <Form.Group key={index} controlId={`option-${index}`}>
              <Form.Control
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <Form.Check
                type="checkbox"

                label="Correct"
                checked={correctAnswers.includes(index)}
                onChange={() => handleCorrectAnswerChange(index)}
              />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={handleAddOption}>
            Add Option
          </Button>
        </div>
      )}

      {questionType === 'true-false' && (
        <div>
          <Form.Check
            type="radio"
            label="True"
            name="trueFalse"
            value="true"
            checked={correctAnswers.includes('true')}
            onChange={() => setCorrectAnswers(['true'])}
          />
          <Form.Check
            type="radio"
            label="False"
            name="trueFalse"
            value="false"
            checked={correctAnswers.includes('false')}
            onChange={() => setCorrectAnswers(['false'])}
          />
        </div>
      )}

      {questionType === 'fill-in-the-blank' && (
        <Form.Group controlId="fillInTheBlank">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the correct answer"
            onChange={(e) => setCorrectAnswers([e.target.value])}
          />
        </Form.Group>
      )}
    </Form>
  );
};

export default QuestionForm;
