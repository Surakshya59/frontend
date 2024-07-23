import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from './Sidebar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/?page=${page}&limit=50`);
        const results = response.data;
        if (Array.isArray(results)) {
          setMovies(prevMovies => [...prevMovies, ...results]);
          setHasMore(results.length === 50);  // Assume has more if 50 results are returned
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/search-movies/?query=${searchTerm}`);
      const results = response.data;
      if (Array.isArray(results)) {
        setSearchResults(results);
        setMovies([]);  // Clear all movies when search is performed
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const loadMoreMovies = () => {
    if (hasMore) setPage(prevPage => prevPage + 1);
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
  };

  const Arrow = (props) => {
    const { className, style, onClick, direction } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'black', color: 'white', padding: '10px', borderRadius: '50%' }}
        onClick={onClick}
      >
        {direction === 'next' ? '>' : '<'}
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const LazyImage = ({ src, alt }) => {
    const [visible, setVisible] = useState(false);

    const handleImageLoad = () => {
      setVisible(true);
    };

    return (
      <LazyLoad height={200} offset={100} once>
        <img
          src={src}
          alt={alt}
          className={`w-full h-64 object-cover rounded mb-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
        />
      </LazyLoad>
    );
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-64 w-full mb-4"></div>
      <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
      <div className="bg-gray-300 h-4 w-1/2"></div>
    </div>
  );

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
      <div className="flex">
        <Sidebar />
        <main className="relative ml-60 mt-20 text-white w-full flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}>
            <div className="mywidth mb-10 w-full max-w-7xl p-4">
              <div className="w-full flex justify-center items-center mb-10">
                <input
                  type="text"
                  placeholder="Search for movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 w-full max-w-md text-black rounded"
                />
                <button
                  onClick={handleSearch}
                  className="p-2 ml-2 bg-yellow-500 text-black font-bold rounded"
                >
                  Search
                </button>
              </div>
              {searchResults && searchResults.length > 0 ? (
                <div className="w-full max-w-7xl p-4">
                  <h2 className="text-3xl mb-4 font-bold text-yellow-300">Search Results:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((result) => (
                      <div key={result.id} className="text-black bg-white p-4 rounded" onClick={() => handleMovieClick(result.id)}>
                        <LazyImage 
                          src={result.poster_url} 
                          alt={result.title} 
                        />
                        <h3 className="text-xl font-bold">{result.title}</h3>
                        <p className="text-sm text-gray-600">Release Date: {result.release_date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl mb-4 font-bold text-yellow-300">All Movies</h2>
                  <Slider {...settings}>
                    {loading ? (
                      Array.from({ length: 3 }).map((_, index) => <SkeletonLoader key={index} />)
                    ) : (
                      movies.map((movie) => (
                        <div key={movie.id} className="p-2" onClick={() => handleMovieClick(movie.id)}>
                          <div className="text-black bg-white p-4 rounded" style={{ height: '300px', width: '200px' }}>
                            <LazyImage 
                              src={movie.poster_url} 
                              alt={movie.title} 
                            />
                            <h3 className="text-xl font-bold">{movie.title}</h3>
                            <p className="text-sm text-gray-600">Release Date: {movie.release_date}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </Slider>
                  {hasMore && !loading && (
                    <button 
                      onClick={loadMoreMovies} 
                      className="mt-4 p-2 bg-yellow-500 text-black font-bold rounded"
                    >
                      Load More
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
