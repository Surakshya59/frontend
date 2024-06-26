// src/components/ContactUs.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/bgmain.jpg';
import Sidebar from '../components/Sidebar';

const Feedback = () => {
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
          <h2 className="text-3xl mb-4 text-bold text-red-900 text-center"><br/>Feedback<br/></h2>
          <p className="text-lg"><br/>
            We would love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us. Our team is here to help you make the most of your movie-watching experience.
          </p>
          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                rows="4"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
