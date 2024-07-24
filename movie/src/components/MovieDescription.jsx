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
  minHeight: '100vh',
};

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '20px',
  borderRadius: '10px',
  width: '100%',
  height: '100%',
};

const boxStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Black box with opacity
  padding: '20px',
  borderRadius: '10px',
  color: 'white',  // White text color
  display: 'flex',
  alignItems: 'flex-start',
};

const posterStyle = {
  width: '200px',
  height: 'auto',
  marginRight: '20px',
};

const detailsStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const ratingFormStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const starContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const starStyle = {
  fontSize: '30px',
  cursor: 'pointer',
  color: '#ddd', // Default color of stars
};

const filledStarStyle = {
  color: '#ffc107', // Color of filled stars
};

const MovieDescription = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${id}/`);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        if (err.response) {
          console.error('Error response data:', err.response.data);
          console.error('Error response status:', err.response.status);
          console.error('Error response headers:', err.response.headers);
        } else if (err.request) {
          console.error('Error request data:', err.request);
        } else {
          console.error('Error message:', err.message);
        }
        setError('Movie not found or there was an error fetching the movie details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/movies/${id}/rate/`, {
        rating
      });
      setSubmitSuccess('Rating submitted successfully!');
      setMovie((prevMovie) => ({
        ...prevMovie,
        average_rating: response.data.average_rating,
      }));
      setRating(0);
      setSubmitError(null);
    } catch (err) {
      console.error('Error submitting rating:', err);
      setSubmitError('Failed to submit rating. Please try again.');
      setSubmitSuccess(null);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        style={star <= rating ? {...starStyle, ...filledStarStyle} : starStyle}
        onClick={() => handleRatingChange(star)}
      >
        ★
      </span>
    ));
  };

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
    <div style={backgroundStyle} className="flex flex-col">
      <div className="flex">
        <Sidebar />
        <main className="relative ml-60 mt-20 text-white w-full flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}>
            <div className="mywidth mb-10 w-full max-w-7xl p-4">
              <div style={boxStyle}>
                <img src={movie.poster_url} alt={movie.title} style={posterStyle} />
                <div style={detailsStyle}>
                  <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                  <p className="text-lg mb-2"><strong>Overview:</strong> {movie.overview}</p>
                  <p className="text-lg mb-2"><strong>Genre:</strong> {movie.genres}</p>
                  <p className="text-lg mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
                  {Array.isArray(movie.directors) && (
                    <p className="text-lg mb-2"><strong>Directors:</strong> {movie.directors.join(', ')}</p>
                  )}
                  <p className="text-lg mb-2"><strong>Runtime:</strong> {movie.runtime} minutes</p>
                  <p className="text-lg mb-2"><strong>Budget:</strong> ${movie.budget?.toLocaleString()}</p>
                  {Array.isArray(movie.credits) && (
                    <p className="text-lg mb-2"><strong>Credits:</strong> {movie.credits.join(', ')}</p>
                  )}
                  <p className="text-lg mb-2"><strong>Average Rating:</strong> {movie.avg_rating || 'N/A'}</p>
                  
                  <form style={ratingFormStyle} onSubmit={handleRatingSubmit}>
                    <label htmlFor="rating" className="mb-2"><strong>Rate this movie:</strong></label>
                    <div id="rating" name="rating" style={starContainerStyle}>
                      {renderStars()}
                    </div>
                    <button type="submit" className="p-2 rounded bg-blue-500 text-white mt-2">Submit Rating</button>
                  </form>

                  {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
                  {submitSuccess && <p className="text-green-500 mt-2">{submitSuccess}</p>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MovieDescription;
