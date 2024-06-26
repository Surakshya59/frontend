// src/components/ContactUs.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/bgmain.jpg';
import Sidebar from '../components/Sidebar';

const ContactUs = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    margin: '0',
    padding: '0',
    height: '100%',
  };

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
      <Sidebar />
      <main className="ml-1/5 p-10 text-white w-full flex flex-col items-center">
        <div className="w-full max-w-4xl bg-black bg-opacity-50 p-6 rounded shadow">
          <h2 className="text-3xl mb-4 text-bold text-red-900 text-center"><br/>Contact Us<br/></h2>
          
      
  
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
