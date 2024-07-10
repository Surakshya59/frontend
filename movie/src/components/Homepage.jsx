import React, { useState } from 'react';
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from './Sidebar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/search-movies/?query=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <div className="text-black">Next</div>,
    prevArrow: <div className="text-black">Prev</div>,
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
              {searchResults.length > 0 && (
                <div className="w-full max-w-7xl p-4">
                  <h2 className="text-3xl mb-4 font-bold text-yellow-300">Search Results:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((result) => (
                      <div key={result.id} className="text-black bg-white p-4 rounded">
                        <img src={result.poster_path} alt={result.title} className="w-full h-64 object-cover rounded mb-4" />
                        <h3 className="text-xl font-bold">{result.title}</h3>
                        <p className="text-sm text-gray-600">Release Date: {result.release_date}</p>
                        <p className="text-sm">{result.overview}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <h2 className="text-3xl mb-4 font-bold text-yellow-300">Recommended for you</h2>
              <Slider {...settings}>
                <div className="p-2">
                  <div className="w-48 h-50 bg-green-400 overflow-hidden"></div>
                </div>
              </Slider>
            </div>
            <div className="mb-10 w-full max-w-7xl p-4">
              <h2 className="text-3xl mb-4 font-bold text-yellow-300">Popular</h2>
              <Slider {...settings}>
                <div className="p-2">
                  <div className="w-48 h-50 bg-green-400 overflow-hidden"></div>
                </div>
              </Slider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
