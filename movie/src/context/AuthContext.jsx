import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    adminLoggedIn: false,
    profilePicture: '',
    name: '',
    favorites: [],
    ratedMovies: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(prevUser => ({ ...prevUser, adminLoggedIn: true }));
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token); // Store token in localStorage
    setUser(prevUser => ({ ...prevUser, adminLoggedIn: true }));
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(prevUser => ({ ...prevUser, adminLoggedIn: false }));
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
