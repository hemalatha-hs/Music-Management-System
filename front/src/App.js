import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './Aouth/Login';
import Signup from './Aouth/Signup';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;


