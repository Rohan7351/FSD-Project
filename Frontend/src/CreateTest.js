import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTest.css';
import './assets/books.jpg'

const CreateTest = () => {
    const navigate = useNavigate();
    const [testDetails, setTestDetails] = useState({
        title: '',
        passingScore: '',
        duration: '',
        startTime: '',
        endTime: '',
        category: '',
        description: '',
        questions: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestDetails({ ...testDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/createtest/addquestions', { state: { testDetails } });
    };

    return (
        <body className="main-container">
        <div className="create-test-container">
            <div className="image-container">
                <img src="https://64.media.tumblr.com/91b0a582f92bffd85dafeabf80fd7bd1/tumblr_p4y9droeIE1ud1v24o1_1280.jpg" alt="Exam" />
                <div className="image-overlay">
                    <h2>#work</h2>
                </div>
            </div>
            <div className="form-container">
                <h2 className="form-title">Create Test</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input 
                            type="text" 
                            name="title" 
                            placeholder='Exam Name'
                            value={testDetails.title} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="category"
                            placeholder='Exam Category' 
                            value={testDetails.category} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-row">
                        <input 
                            type="number" 
                            name="passingScore" 
                            placeholder='Passing Score'
                            value={testDetails.passingScore} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="number" 
                            name="duration" 
                            placeholder='Duration (in minutes)'
                            value={testDetails.duration} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-row">
                        <div className="datetime-input">
                            <label htmlFor="startTime">Start Time</label>
                            <input 
                                type="datetime-local" 
                                id="startTime" 
                                name="startTime" 
                                value={testDetails.startTime} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="datetime-input">
                            <label htmlFor="endTime">End Time</label>
                            <input 
                                type="datetime-local" 
                                id="endTime" 
                                name="endTime" 
                                value={testDetails.endTime} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <textarea 
                        name="description" 
                        placeholder="Description"
                        value={testDetails.description} 
                        onChange={handleChange} 
                        required
                    ></textarea>
                    <button type="submit" className="submit-btn">Create Test</button>
                </form>
            </div>
        </div>
        </body>
    );
};

export default CreateTest;