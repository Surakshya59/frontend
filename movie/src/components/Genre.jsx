// src/pages/GenrePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";

const GenrePage = () => {
  const { genre } = useParams(); // Get the genre from the route parameters
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api2/movies/genre/${encodeURIComponent(genre)}/`);
        setMovies(response.data);
        console.log(response)
      } 
      catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }

    };

    fetchMovies();
  }, [genre]);
 
  return (
    <main className="ml-1/6 p-2 md:p-4">
      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="text-white bg-black p-2 md:p-3 rounded cursor-pointer hover:bg-gray-800"
              onClick={() => handleMovieClick(movie.id)}
            >
              <LazyLoadImage
                src={movie.poster_url ? movie.poster_url : `data:image/jpeg;base64,${movie.poster}`}
                fallbackSrc="/path/to/default/poster.jpg"
                alt={movie.title}
                className="w-full h-auto rounded"
              />
              <h3 className="text-lg md:text-xl font-bold mt-2">{movie.title}</h3>
              <p className="text-xs md:text-sm">Release Date: {movie.release_date}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWatchlist(movie.id);
                }}
                className="mt-2 bg-red-900 text-white font-bold py-1 px-2 rounded"
              >
                Add to Watchlist
              </button>
            </div>
          ))}
        </div>
      )}
      {movies.length === 0 && !loading && !error && <p>No movies found for this genre.</p>}
    </main>
  );
}

export default GenrePage;
