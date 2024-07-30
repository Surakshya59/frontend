// src/pages/GenrePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GenrePage = () => {
  const { genre } = useParams(); // Get the genre from the route parameters
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api2/movies/genre/${encodeURIComponent(genre)}`);
        setMovies(response.data);
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  return (
    <main className="ml-1/6 p-4">
      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-white text-xl">{movie.title}</h2>
              <p className="text-gray-400">{movie.description}</p>
            </div>
          ))}
        </div>
      )}
      {movies.length === 0 && !loading && !error && <p>No movies found for this genre.</p>}
    </main>
  );
};

export default GenrePage;
