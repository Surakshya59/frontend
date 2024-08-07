import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import backgroundImage from "../images/bgmain.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.id);
        login(response.data.token); // Call login with the token
        setSuccess('Login successful!');
        navigate('/home');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div style={backgroundStyle} className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-black bg-opacity-50 p-10 rounded-lg w-full max-w-lg">
        <div className='bg-black mb-6 p-2 rounded-sm w-full'>
          <h1 className="text-red-900 text-4xl p-3 font-bold text-center">Welcome to MRS</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded bg-gray-800 bg-opacity-50 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-800 bg-opacity-50 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs p-3 rounded bg-red-900 text-white font-bold hover:bg-red-900">
              Log In
            </button>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/signup" className="text-white text-lg bg-black p-2 rounded-sm w-1/2 text-center">Register</Link>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-2 bg-red-900 text-white text-center rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-2 bg-green-900 text-white text-center rounded">
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
