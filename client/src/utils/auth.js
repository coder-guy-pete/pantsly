import { jwtDecode } from 'jwt-decode';
import { Navigate as navigate } from 'react-router-dom';

const AuthService = {
    getProfile() {
        try {
            const token = this.getToken();
            if (token) {
                return jwtDecode(token);
            }
            return null;
        } catch (error) {
            console.error("Error getting profile:", error);
            return null;
        }
    },

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    },

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return true; // Consider expired if there's an error
        }
    },

    getToken() {
        return localStorage.getItem('token');
    },

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        navigate('/');
    },

    logout() {
        localStorage.removeItem('id_token');
        navigate('/');
    },

    getHardcodedUser() {
        return {
            name: "Test User",
            email: "hardcoded@example.com",
            password: "password123",
            address1: "1234 Elm St",
            address2: "Apt 123",
            city: "Springfield",
            state: "IL",
            zip: "62701",
        };
    }
};

export default AuthService;