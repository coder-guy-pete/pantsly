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
                // Check for hardcoded user only if not logged in normally
                const hardcodedUser = AuthService.getHardcodedUser();
                if (hardcodedUser) {
                    setUser(hardcodedUser);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (idToken) => {
        const success = AuthService.login(idToken);
        if (success) {
            setUser(AuthService.getProfile());
            navigate('/');
        } else {
            return false;
        }
    };

    const logout = async () => {
        AuthService.logout();
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};