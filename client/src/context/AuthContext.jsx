import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'Guest', email: 'guest@email.com', address1: '123 Main Street', city: 'Anytown', state: 'CA', zipcode: '12345' });

    const login = (userData) => {
        console.log("Mock Login:", userData);
        setUser(userData);
    };

    const logout = () => {
        console.log("Mock Logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};