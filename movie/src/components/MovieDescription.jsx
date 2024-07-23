import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDescription = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${id}/`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="text-white p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img src={movie.poster_url} alt={movie.title} className="w-full h-auto mb-4" />
      <p className="text-lg mb-4">Release Date: {movie.release_date}</p>
      <p className="text-lg">{movie.description}</p>
    </div>
  );
};

export default MovieDescription;
