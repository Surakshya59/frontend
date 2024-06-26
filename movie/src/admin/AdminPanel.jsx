// src/admin/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'; // Example: Use Axios for HTTP requests

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const history = useHistory();

  // Example: Fetch movies from backend upon component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://api.example.com/movies'); // Replace with actual API endpoint
      setMovies(response.data); // Assuming response.data is an array of movies
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleAddMovie = async () => {
    try {
      const response = await axios.post('http://api.example.com/movies', { title: newMovieTitle }); // Replace with actual API endpoint and data structure
      console.log('Movie added successfully:', response.data);
      fetchMovies(); // Refresh movie list
      setNewMovieTitle('');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleLogout = () => {
    // Example: Implement logout functionality
    // Clear admin session and redirect to login page
    history.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl mb-4">Admin Panel</h2>
      <div className="bg-white p-6 rounded shadow w-96 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Movie</h3>
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          placeholder="Enter movie title"
          className="w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <button
          onClick={handleAddMovie}
          className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Movie
        </button>
      </div>
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-xl font-semibold mb-4">Movie List</h3>
        <ul className="divide-y divide-gray-200">
          {movies.map((movie) => (
            <li key={movie.id} className="py-2">{movie.title}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
