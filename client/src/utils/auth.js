import { jwtDecode } from 'jwt-decode';

const AuthService = {
    getProfile() {
        const token = this.getToken();
        try{
        if (!token) return null; {
            const decoded = jwtDecode(token);
            return decoded;
        }
    } catch (err) {
            console.error('Error decoding token:', err);
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
            return decoded?.exp < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    },

    getToken() {
        const loggedUser = localStorage.getItem('id_token') || '';
        return loggedUser;
    },

    login(token) {
        localStorage.setItem('id_token', token);
        window.location.assign('/');
    },

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    },
};

export default AuthService;