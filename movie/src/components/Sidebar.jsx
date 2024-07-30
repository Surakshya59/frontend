import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  useEffect(() => {}, [location.pathname]);

  const handleGenreToggle = () => {
    setIsGenreOpen(!isGenreOpen);
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
                    <Link to="/home" className="text-white text-lg">
                      Home
                    </Link>
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
                          <Link to="/genre/action" className="text-white">
                            Action
                          </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700">
                          <Link to="/genre/sci-fi" className="text-white">
                            Sci-Fi
                          </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700">
                          <Link to="/genre/romantic" className="text-white">
                            Romantic
                          </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700">
                          <Link to="/genre/comedy" className="text-white">
                            Comedy
                          </Link>
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
    </>
  );
};

export default Layout;
