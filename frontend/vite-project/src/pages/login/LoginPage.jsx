import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      // API call to login the user
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      setLoading(false);
      
      if (response.data.success) {
        // Redirect to dashboard or home page after successful login
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to registration page */}
        <div className="register-link">
          <p>Not registered yet? <Link to="/register">Click here to register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

