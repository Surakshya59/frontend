import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { adminLoggedIn } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close the sidebar when navigating to another page
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="w-full fixed top-0 left-0 bg-gray-900 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-black text-3xl">
            &#9776;
          </button>
          <h1 className="text-red-900 font-bold text-4xl">MRS</h1>
        </div>
      </header>

      {isSidebarOpen && (
        <aside className="h-screen fixed top-0 left-0 w-1/6 bg-gray-900 p-4 flex flex-col justify-between z-20">
          <div className="flex flex-col gap-4">
            <header className="flex items-center gap-4 mb-4">
              <button onClick={toggleSidebar} className="text-black text-3xl">
                &#9776;
              </button>
              <h1 className="text-red-900 font-bold text-4xl">MRS</h1>
            </header>
            {adminLoggedIn && (
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
                      <Link to="/popular" className="text-white text-lg">
                        Popular
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link to="/rating" className="text-white text-lg">
                        Rating
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
            {adminLoggedIn ? (
              <ul>
                <li className="mb-4">
                  <Link to="/logout" className="text-white text-lg">
                    Logout
                  </Link>
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
      )}
    </>
  );
};

export default Layout;
