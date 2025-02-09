import React, { createContext, useState, useEffect } from 'react';
import authService from '../utils/auth';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = authService.decodeJwt(token);
                    if (decodedToken) {
                        setUser(decodedToken);
                    }
                } catch (error) {
                    console.error("Token verification error:", error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            const decodedToken = authService.decodeJwt(data.token);
            if (decodedToken) {
                setUser(decodedToken);
                localStorage.setItem('token', data.token);
                } else {
                console.error("Invalid JWT token provided");
                }
            } catch (error) {
                console.error("Login Error:", error);
                throw error;
            }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};