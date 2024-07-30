import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTest.css';

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
        <section className="test-creation-page">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-6 d-none d-xl-block">
                        <div className="image-container">
                            <img src="https://michiganassessment.org/wp-content/uploads/2020/02/20.02.IMG_.PT-H2-680x453.jpg" alt="Exam Image" />
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card-body p-md-5 text-black">
                            <h3 className="mb-5 text-uppercase">Create Test</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="form-outline">
                                            <input 
                                                type="text" 
                                                id="title" 
                                                name="title" 
                                                placeholder='Exam Name'
                                                className="form-control form-control-lg" 
                                                value={testDetails.title} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                            {/* <label className="form-label" htmlFor="title">Title</label> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-outline">
                                            <input 
                                                type="text" 
                                                id="category" 
                                                name="category"
                                                placeholder='Exam Catagory' 
                                                className="form-control form-control-lg" 
                                                value={testDetails.category} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                            {/* <label className="form-label" htmlFor="category">Category</label> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="form-outline">
                                            <input 
                                                type="number" 
                                                id="passingScore" 
                                                name="passingScore" 
                                                placeholder='Passing Score'
                                                className="form-control form-control-lg" 
                                                value={testDetails.passingScore} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                            {/* <label className="form-label" htmlFor="passingScore">Passing Score</label> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-outline">
                                            <input 
                                                type="number" 
                                                id="duration" 
                                                name="duration" 
                                                placeholder='Duration(in minutes)'
                                                className="form-control form-control-lg" 
                                                value={testDetails.duration} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                            {/* <label className="form-label" htmlFor="duration">Duration (minutes)</label> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="startTime">Start Time</label>
                                            <input 
                                                type="datetime-local" 
                                                id="startTime" 
                                                name="startTime" 
                                                className="form-control form-control-lg" 
                                                value={testDetails.startTime} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                            <label className="form-label" htmlFor="endTime">End Time</label>
                                        <div className="form-outline">
                                            <input 
                                                type="datetime-local" 
                                                id="endTime" 
                                                name="endTime" 
                                                className="form-control form-control-lg" 
                                                value={testDetails.endTime} 
                                                onChange={handleChange} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        className="form-control form-control-lg" 
                                        value={testDetails.description} 
                                        onChange={handleChange} 
                                        required
                                    ></textarea>
                                    <label className="form-label" htmlFor="description">Description</label>
                                </div>
                                <div className="d-flex justify-content-end pt-3">
                                    <button type="submit" className="btn btn-warning btn-lg ms-2">Create Test</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateTest;
