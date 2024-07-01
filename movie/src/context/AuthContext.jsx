import React, { createContext, useState, useContext } from 'react';

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

  const login = () => {
    setUser(prevUser => ({ ...prevUser, adminLoggedIn: true }));
  };

  const logout = () => {
    console.log('logout');
    setUser(prevUser => ({ ...prevUser, adminLoggedIn: false }));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
