import React, { createContext, useState, useEffect } from 'react';
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
        AuthService.login(idToken);
        setUser(AuthService.getProfile());
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};