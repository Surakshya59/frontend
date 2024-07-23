import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

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
                  <li className="mb-4">
                    <Link to="/genre" className="text-white text-lg">
                      Genre
                    </Link>
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
