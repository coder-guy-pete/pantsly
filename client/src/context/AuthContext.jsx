import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    isLoading: true,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (AuthService.loggedIn()) {
                setUser(AuthService.getProfile());
            } else {
                setUser(null);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (token) => {
        try {
            AuthService.login(token);
            setUser(AuthService.getProfile());
            navigate('/');
            return true;
        } catch (err) {
            console.error('Login error:', err);
            setUser(null);
            return false;
        }
    };

    const logout = async () => {
        AuthService.logout();
        setUser(null);
        navigate('/');
        return;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};