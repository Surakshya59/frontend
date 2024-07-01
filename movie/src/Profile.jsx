import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');
  const [name, setName] = useState(user.name || '');
  const [favorites, setFavorites] = useState(user.favorites || []);
  const [ratedMovies, setRatedMovies] = useState(user.ratedMovies || []);

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
    <div className="p-4">
      <h1 className="text-3xl mb-4">My Profile</h1>
      <div className="mb-4">
        <label className="block mb-2">Profile Picture</label>
        <input type="file" onChange={handleProfilePictureChange} />
        {profilePicture && <img src={profilePicture} alt="Profile" className="mt-2 w-32 h-32 object-cover" />}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="p-2 border border-gray-400 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl mb-2">Rated Movies</h2>
        <ul>
          {ratedMovies.map((movie) => (
            <li key={movie.id} className="mb-2">
              <Link to={`/movies/${movie.id}`} className="text-blue-500">
                {movie.title}
              </Link> - Rating: {movie.rating}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl mb-2">Favorites</h2>
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id} className="mb-2">
              <Link to={`/movies/${movie.id}`} className="text-blue-500">
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
