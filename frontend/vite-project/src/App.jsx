
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/login/LoginPage'
// import LoginPage from './login/LoginPage';  // Adjust path based on your structure

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;

