import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Link } from 'react-router-dom';
import backgroundImage from "./images/bgmain.jpg";
import Sidebar from './components/Sidebar';
import './index.css'; // Ensure Tailwind CSS is imported

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');
  const [name, setName] = useState(user.name || '');
  const [favorites, setFavorites] = useState(user.favorites || []);
  const [ratedMovies, setRatedMovies] = useState(user.ratedMovies || []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
      setUser(prevUser => ({ ...prevUser, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setUser(prevUser => ({ ...prevUser, name: e.target.value }));
  };

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
      <div className="flex">
        <Sidebar />
        <main className="fixed top-0 left-60 text-white w-full flex flex-col items-center">
          <div className="mywidth mb-10 w-full max-w-7xl p-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-yellow-300">My Profile</h1>
            <div className="mb-6 ">
              <label className="block mb-2 font-medium text-gray-200">Profile Picture</label>
              <div className="relative group">
                <img 
                  src={profilePicture || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="w-32 h-32 object-cover rounded-full border-4 border-white"
                />
                <div className="absolute inset-0  justify-center flex-row-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="text-white cursor-pointer">
                   <br/> Change
                    <input 
                      type="file" 
                      onChange={handleProfilePictureChange} 
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium  text-gray-200">NAME Inport from signup</label>
            
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Rated Movies</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-200">
                {ratedMovies.map((movie) => (
                  <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} className="text-blue-500 hover:underline">
                      {movie.title}
                    </Link> - Rating: {movie.rating}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Favorites</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-200">
                {favorites.map((movie) => (
                  <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} className="text-blue-500 hover:underline">
                      {movie.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
