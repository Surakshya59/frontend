import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { adminLoggedIn } = useContext(AuthContext);
  console.log(adminLoggedIn);

  return (
    <aside className="h-screen fixed top-0 left-0 w-1/6 bg-gray-900 p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-red-900 font-bold text-align-center text-4xl">MRS</h1>
        {adminLoggedIn ? (
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
            </ul>
          </nav>
        ) : null}
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
  );
};

export default Sidebar;
