import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from './Sidebar';

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  padding: '20px',
  borderRadius: '10px',
};

const MovieDescription = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${id}/`);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Movie not found or there was an error fetching the movie details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
      <div className="flex">
        <Sidebar />
        <main className="relative ml-60 mt-20 text-white w-full flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}>
            <div className="mywidth mb-10 w-full max-w-7xl p-4">
              <div className="text-white p-4">
                <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                <img src={movie.poster_url} alt={movie.title} className="w-full h-auto mb-4" />
                <p className="text-lg mb-4">Release Date: {movie.release_date}</p>
                <p className="text-lg">{movie.description}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MovieDescription;
