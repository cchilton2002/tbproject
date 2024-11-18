import React from 'react';
import Login from './components/Login';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Tasks from './components/Dashboard/Tasks';
import News from './components/News';
import Sports from './components/Sports';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/news' element={<News />} />
        <Route path='/sports' element={<Sports />} />
      </Routes>
    </Router>
  );
}

export default App;
