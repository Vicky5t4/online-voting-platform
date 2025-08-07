import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate(); // for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API}/auth/register`, {
        username,
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token); // store token
        alert('✅ Registered successfully!');
        navigate('/login'); // redirect to dashboard
      }
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Registration failed';
      setError(msg);
      console.error('Register error:', err);
    }
  };

  return (
    <div className='container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className='input-group'>
          <label>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className='input-group'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='input-group'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit' className='submit-button'>
          Register
        </button>

        {error && <p className='error-message'>{error}</p>}

        <p className='login-prompt'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
