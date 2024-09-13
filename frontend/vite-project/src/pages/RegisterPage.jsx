


import React, { useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client', 
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // API call to register the user
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setLoading(false);
      
      if (response.data.success) {
        // Redirect to login page after successful registration
         navigate('/login');
        
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
      <h2 className="register-header">Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>

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

        <div className="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Register as</label>
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="client">Client</option>
            <option value="lawyer">Lawyer</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="register-link">
          <p>Already registered ? <Link to="/login">Click here to Login</Link></p>
        </div>
    </div>
    </div>
  );
};

export default RegisterPage;
