// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TakeTest from './TakeTest';
import Login from './Login';
import CreateTest from './CreateTest';
import AddQuestions from './AddQuestions';
// import TestContainer from './components/TestContainer';
import TestPage from './components/TestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateTest />} />
        <Route path="/createtest/addquestions" element={<AddQuestions />} />
        <Route path="/taketest" element={<TakeTest />} />
        <Route path="/createtest" element={<CreateTest/>} />
        {/* <Route path='/testcontainer' element={<TestContainer/>}/> */}
        <Route path='/testpage' element={<TestPage/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
