// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TakeTest from './TakeTest';
import Login from './Login';
import CreateTest from './CreateTest';
import AddQuestions from './AddQuestions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateTest />} />
        <Route path="/createtest/addquestions" element={<AddQuestions />} />
        <Route path="/taketest" element={<TakeTest />} />
        <Route path="/createtest" element={<CreateTest/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
