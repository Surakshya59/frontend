import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LogoutPage = () => {
    const navigate = useNavigate(); // Corrected variable name

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout(); // Assuming logout function is async
                navigate('/login'); // Redirect to login page after logout
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        handleLogout();
    }, [logout, navigate]);

    return null; // Or you can return a loading indicator if needed
};

export default LogoutPage;
