import React from 'react';
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from './Sidebar';
import MovieListpage from './movieListpage';

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
      <div className="flex">
        <Sidebar />
        <MovieListpage />
      </div>
    </div>
  );
};

export default HomePage;
