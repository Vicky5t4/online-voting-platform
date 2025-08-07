import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const API = import.meta.env.VITE_API_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Reset previous error
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password })

      alert('Login Success ✅')

      const userData = {
        id: res.data.userId,
        username: res.data.username,
      }

      login(userData)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed ❌')
      console.error('Login failed:', err)
    }
  }

  return (
    <div className='container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Login</h2>

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
          Login
        </button>

        {error && <p className='error-message'>{error}</p>}

        <p className='login-prompt'>
          Don’t have an account? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
