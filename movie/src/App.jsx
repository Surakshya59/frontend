// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './Landing/Suru';
import SignupPage from './Signup/Signup';
import LoginPage from './Login/Login';
import Logout from './logout/logout';
import Contacts from './Navbar/Contact';
import AboutUs from './Navbar/About';
import Feedback from './Navbar/Feedback';
import Homepage from './components/Homepage';
import Watchlist from './components/Watchlist';
import Trending from './components/Trending';
import Footer from './Footer/Footer'; // Import the Footer component
import './index.css'; // Ensure correct path to your CSS file

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

const Main = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col"> {/* Adjust styles as needed */}
      <div className="flex-grow"> {/* Adjust content margin to avoid overlap with the fixed navbar */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/home" element={<Homepage /> } />
          <Route path="/watchlist" element={ <Watchlist />} />
          <Route path="/trending" element={ <Trending />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
      <Footer /> 
    </div>
  );
};

export default App;
