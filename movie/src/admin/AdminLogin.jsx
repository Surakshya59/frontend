// src/admin/AdminLogin.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for v6

const AdminLogin = () => {
  const navigate = useNavigate(); // useNavigate for navigation in v6

  const handleLogin = () => {
    // Example: Perform login logic here
    navigate('/adminpanel'); // Navigate to admin panel upon successful login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Login form elements */}
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Input fields */}
          </div>
          <div>
            {/* Login button */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
