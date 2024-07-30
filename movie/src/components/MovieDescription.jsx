import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from './Sidebar';

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
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

const threeDotsMenuStyle = {
  position: 'relative',
  display: 'inline-block',
};

const threeDotsContentStyle = {
  display: 'none',
  position: 'absolute',
  right: '0',
  backgroundColor: '#fff',
  minWidth: '120px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  zIndex: '1',
};

const threeDotsMenuHoverStyle = {
  display: 'block',
};

const MovieDescription = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movie_id}/`);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Movie not found or there was an error fetching the movie details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRatingAndReview = async () => {
      if (!token || !user_id) return;

      try {
        const ratingResponse = await axios.get(`http://127.0.0.1:8000/api1/ratings/user/${user_id}/movie/${id}/`, {
          headers: { Authorization: `Token ${token}` }
        });
        setUserRating(ratingResponse.data);
        setRating(ratingResponse.data.rating);

        const reviewResponse = await axios.get(`http://127.0.0.1:8000/api1/reviews/user/${user_id}/movie/${id}/`, {
          headers: { Authorization: `Token ${token}` }
        });
        setUserReview(reviewResponse.data);
        setReview(reviewResponse.data.review);
      } catch (err) {
        console.error('Error fetching user rating and review:', err);
      }
    };

    fetchMovie();
    fetchUserRatingAndReview();
  }, [id, token, user_id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setSubmitError('You must be logged in to rate a movie.');
      setSubmitSuccess(null);
      return;
    }

    if (!user_id) {
      setSubmitError('User ID not found. Please log in again.');
      setSubmitSuccess(null);
      return;
    }

    try {
      const ratingPayload = { user: user_id, movie: id, rating };

      if (userRating) {
        await axios.put(`http://127.0.0.1:8000/api1/ratings/${userRating.id}/`, ratingPayload, {
          headers: { Authorization: `Token ${token}` }
        });
      } else {
        await axios.post(`http://127.0.0.1:8000/api1/ratings/create/`, ratingPayload, {
          headers: { Authorization: `Token ${token}` }
        });
      }

      setSubmitSuccess('Rating submitted successfully!');
      setSubmitError(null);
      setUserRating({ ...ratingPayload }); // Update local user rating state
      setMovie((prevMovie) => ({
        ...prevMovie,
        avg_rating: rating // Update the average rating if needed
      }));
    } catch (err) {
      console.error('Error submitting rating:', err);
      setSubmitError('Failed to submit rating. Please try again.');
      setSubmitSuccess(null);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setSubmitError('You must be logged in to leave a review.');
      setSubmitSuccess(null);
      return;
    }

    if (!user_id) {
      setSubmitError('User ID not found. Please log in again.');
      setSubmitSuccess(null);
      return;
    }

    try {
      const reviewPayload = { user: user_id, movie: id, review };

      if (userReview) {
        await axios.put(`http://127.0.0.1:8000/api1/reviews/${userReview.id}/`, reviewPayload, {
          headers: { Authorization: `Token ${token}` }
        });
      } else {
        await axios.post(`http://127.0.0.1:8000/api1/reviews/create/`, reviewPayload, {
          headers: { Authorization: `Token ${token}` }
        });
      }

      setSubmitSuccess('Review submitted successfully!');
      setSubmitError(null);
      setUserReview({ ...reviewPayload }); // Update local user review state
    } catch (err) {
      console.error('Error submitting review:', err);
      setSubmitError('Failed to submit review. Please try again.');
      setSubmitSuccess(null);
    }
  };

  const handleEditReview = () => {
    setReview(userReview.review);
  };

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api1/reviews/${userReview.id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setUserReview(null);
      setReview('');
      setSubmitSuccess('Review deleted successfully!');
    } catch (err) {
      console.error('Error deleting review:', err);
      setSubmitError('Failed to delete review. Please try again.');
      setSubmitSuccess(null);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        style={star <= rating ? { ...starStyle, ...filledStarStyle } : starStyle}
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
    <div style={backgroundStyle} className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <main className="relative ml-60 mt-20 text-white w-full flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}>
            <div className="mywidth mb-10 w-full max-w-7xl p-4">
              <div style={boxStyle}>
                <img src={movie.poster_url} alt={movie.title} style={posterStyle} />
                <div style={detailsStyle}>
                  <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                  <p className="text-lg mb-1"><strong>Overview:</strong> {movie.overview}</p>
                  <p className="text-lg mb-1"><strong>Genre:</strong> {movie.genres}</p>
                  <p className="text-lg mb-1"><strong>Release Date:</strong> {movie.release_date}</p>
                  {Array.isArray(movie.directors) && (
                    <p className="text-lg mb-2"><strong>Directors:</strong> {movie.directors.join(', ')}</p>
                  )}
                  <p className="text-lg mb-1"><strong>Runtime:</strong> {movie.runtime} minutes</p>
                  <p className="text-lg mb-1"><strong>Budget:</strong> ${movie.budget}</p>
                  <p className="text-lg mb-1"><strong>Average Rating:</strong> {movie.avg_rating}</p>
                  {userRating && (
                    <div className="text-lg mb-1">
                      <strong>Your Rating:</strong> {userRating.rating}
                    </div>
                  )}
                  {userReview && (
                    <div className="text-lg mb-1">
                      <strong>Your Review:</strong> {userReview.review}
                      <div
                        style={threeDotsMenuStyle}
                        onMouseEnter={(e) => (e.currentTarget.children[1].style.display = 'block')}
                        onMouseLeave={(e) => (e.currentTarget.children[1].style.display = 'none')}
                      >
                        <span>⋮</span>
                        <div style={threeDotsContentStyle}>
                          <a href="#" onClick={handleEditReview}>Edit</a>
                          <a href="#" onClick={handleDeleteReview}>Delete</a>
                        </div>
                      </div>
                    </div>
                  )}
                  {!userRating && (
                    <form onSubmit={handleRatingSubmit} style={ratingFormStyle}>
                      <div style={starContainerStyle}>
                        {renderStars()}
                      </div>
                      <button type="submit" className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                        Submit Rating
                      </button>
                    </form>
                  )}
                  {!userReview && (
                    <form onSubmit={handleReviewSubmit} style={ratingFormStyle}>
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mt-2 p-2 rounded"
                        rows="1"
                        cols="50"
                        placeholder="Write your review here..."
                      />
                      <button type="submit" className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                        Submit Review
                      </button>
                    </form>
                  )}
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
