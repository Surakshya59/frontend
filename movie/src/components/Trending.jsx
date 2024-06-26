// src/components/Trending.js
import React from 'react';
import { Link } from "react-router-dom";
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from './Sidebar';

const Trending = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  };

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
    <Sidebar/>
      <main className="ml-64 p-10 mr-20 flex-grow flex flex-col justify-between">
        <section className="mb-10 flex-grow">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg h-full">
            <h2 className="text-3xl mb-4 text-white">
       Trending Movies
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Trending;
