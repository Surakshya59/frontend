// src/components/Watchlist.js
import React, { useState } from 'react';
import backgroundImage from '../images/bgmain.jpg';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' },
    { id: 4, title: 'Movie 4' },
  ]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  };

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
<Sidebar/>
        
      <main className="ml-1/5 p-10 text-white w-full flex flex-col items-center">
        <div className="mb-10 w-full max-w-4xl">
          <h2 className="text-3xl mb-4 text-center">My Watchlist</h2>
          <div className="grid grid-cols-3 gap-6">
            {watchlist.length > 0 ? (
              watchlist.map((movie) => (
                <div key={movie.id} className="bg-white p-4 rounded shadow text-black">
                  <h3 className="text-xl mb-2">{movie.title}</h3>
                  <button
                    onClick={() => setWatchlist(watchlist.filter((m) => m.id !== movie.id))}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xl">Your watchlist is empty.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
