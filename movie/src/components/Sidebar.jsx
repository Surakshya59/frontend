import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async (genre) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api2/movies/genre/${genre}`);
        setMovies(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    const genre = location.pathname.split("/")[2];
    if (genre) {
      fetchMovies(genre);
    }
  }, [location.pathname]);

  const handleGenreToggle = () => {
    setIsGenreOpen(!isGenreOpen);
  };

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre}`);
    setIsGenreOpen(false);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 bg-gray-900 p-4 flex justify-between items-center z-10">
        <h1 className="text-red-900 font-bold text-4xl">MRS</h1>
      </header>

      <aside className="h-screen fixed top-0 left-0 w-1/6 bg-gray-900 p-4 flex flex-col justify-between z-20">
        <div className="flex flex-col gap-4">
          <header className="flex items-center gap-4 mb-4">
            <h1 className="text-red-900 font-bold text-4xl">MRS</h1>
          </header>
          {user.adminLoggedIn && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <nav>
                <ul>
                  <li className="mb-4 mt-1">
                    <a href="/home" className="text-white text-lg">
                      Home
                    </a>
                  </li>
                  <li className="mb-4">
                    <Link to="/watchlist" className="text-white text-lg">
                      Watchlist
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/trending" className="text-white text-lg">
                      Trending
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/popular" className="text-white text-lg">
                      Popular
                    </Link>
                  </li>
                  <li className="mb-4 relative">
                    <button
                      onClick={handleGenreToggle}
                      className="text-white text-lg focus:outline-none"
                    >
                      Genre
                    </button>
                    {isGenreOpen && (
                      <ul className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
                        <li className="px-4 py-2 hover:bg-gray-700">
                          <button
                            onClick={() => handleGenreClick("action")}
                            className="text-white"
                          >
                            Action
                          </button>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700">
                          <button
                            onClick={() => handleGenreClick("sci-fi")}
                            className="text-white"
                          >
                            Sci-Fi
                          </button>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700">
                          <button
                            onClick={() => handleGenreClick("romantic")}
                            className="text-white"
                          >
                            Romantic
                          </button>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700">
                          <button
                            onClick={() => handleGenreClick("comedy")}
                            className="text-white"
                          >
                            Comedy
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
        <div>
          {user.adminLoggedIn ? (
            <ul>
              <li className="mb-4">
                <Link to="/profile" className="text-white text-lg">
                  My Profile
                </Link>
              </li>
              <li className="mb-4">
                <button onClick={logout} className="text-white text-lg">
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <nav>
              <ul>
                <li className="mb-4 mt-1">
                  <Link to="/login" className="text-white text-lg">
                    Login
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/signup" className="text-white text-lg">
                    Signup
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </aside>

      {/* Display movies or loading/error messages */}
      <main className="ml-1/6 p-4">
        {loading && <p>Loading movies...</p>}
        {error && <p>{error}</p>}
        {movies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-white text-xl">{movie.title}</h2>
                <p className="text-gray-400">{movie.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;
