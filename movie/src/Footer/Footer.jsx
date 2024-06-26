// src/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/about-us" className="hover:text-gray-400">About Us</Link>
          <Link to="/feedback" className="hover:text-gray-400">Feedback</Link>
          <Link to="/contacts" className="hover:text-gray-400">Contacts</Link>
        </div>
        <p>&copy; 2024 Movie Recommendation System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
