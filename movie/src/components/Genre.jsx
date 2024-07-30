import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Sidebar from './Sidebar';
import backgroundImage from "../images/bgmain.jpg";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

const GenrePage = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api2/movies/genre/${genre}/`);
        setMovies(response.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Movies not found or there was an error fetching the movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={backgroundStyle} className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <main className="relative ml-60 mt-20 text-white w-full flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}>
            <div className="mywidth mb-10 w-full max-w-7xl p-4">
              <h1 className="text-3xl font-bold mb-4 capitalize">{genre} Movies</h1>
              <Slider {...settings}>
                {movies.map(movie => (
                  <div key={movie.id} className="p-2">
                    <Link to={`/movies/${movie.id}`}>
                      <div style={boxStyle}>
                        <img src={movie.poster_url} alt={movie.title} style={posterStyle} />
                        <div>
                          <h2 className="text-xl font-bold">{movie.title}</h2>
                          <p>{movie.overview}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GenrePage;
