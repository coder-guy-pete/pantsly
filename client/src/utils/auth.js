import { jwtDecode } from 'jwt-decode';

const AuthService = {
    getProfile() {
        return jwtDecode(this.getToken());
    },

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    },

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);

            if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
                return true;
            }
        } catch (err) {
            return false;
        }
    },

    getToken() {
        const loggedUser = localStorage.getItem('token') || '';
        return loggedUser;
    },

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    },

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
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