import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const starStyle = {
  fontSize: '30px',
  cursor: 'pointer',
  color: '#ddd',
};

const filledStarStyle = {
  color: '#ffc107',
};

const RateAndReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
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
      setUserRating({ ...ratingPayload });
      setRating(0);
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
      setUserReview({ ...reviewPayload });
      setReview('');
    } catch (err) {
      console.error('Error submitting review:', err);
      setSubmitError('Failed to submit review. Please try again.');
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Rate and Review</h1>
        <form onSubmit={handleRatingSubmit} className="mb-4">
          <div className="flex items-center mb-2">
            {renderStars()}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit Rating
          </button>
        </form>
        <form onSubmit={handleReviewSubmit} className="mb-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="4"
            placeholder="Write your review here..."
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Submit Review
          </button>
        </form>
        {submitError && <p className="text-red-500">{submitError}</p>}
        {submitSuccess && <p className="text-green-500">{submitSuccess}</p>}
        <button onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
          Back
        </button>
      </div>
    </div>
  );
};

export default RateAndReview;
