import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../images/bgmain.jpg'; // Make sure to update the path accordingly

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if any field is empty
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
        confirm_password: confirmPassword,
      });

      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (err) {
      if (err.response) {
        setError(err.response.data);  // Set error state with the error message from the backend
        console.error('Signup error:', err.response.data);
      } else {
        setError('Unexpected error occurred.');  // Handle other errors
        console.error('Unexpected error:', err.message);
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-6">Welcome to MRS</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 p-2 rounded bg-gray-800 bg-opacity-50 text-white"
            />
            <input 
              type="text" 
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 p-2 rounded bg-gray-800 bg-opacity-50 text-white"
            />
          </div>
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 bg-opacity-50 text-white"
          />
          <input 
            type="text" 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 bg-opacity-50 text-white"
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 bg-opacity-50 text-white"
          />
          <input 
            type="password" 
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 bg-opacity-50 text-white"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button 
            type="submit" 
            className="w-full p-2 rounded bg-red-600 text-white font-bold hover:bg-red-700"
          >
            Sign Up
          </button>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/login" className="text-white text-lg bg-black p-2 rounded-sm w-1/2 text-center">Already have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
