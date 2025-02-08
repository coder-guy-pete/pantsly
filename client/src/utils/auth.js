import { mockUsers } from '../mock-data/Users';

const Auth = {
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockUsers.find(user => user.email === email && user.password === password)
                if (user) {
                    const mockToken = generateMockJWT(user)
                    resolve({ token: mockToken })
                } else {
                    reject(new Error('Invalid email or password'))
                }
            }, 1000);
        });
    },

    logout: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500);
        });
    },

    generateMockJWT: (user) => {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const base64Payload = btoa(JSON.stringify(payload));
        return `mock.${base64Payload}.signature`;
    },

    decodeJwt: (token) => {
        try {
            const base64Payload = token.split('.')[1];
            const payloadJson = atob(base64Payload);
            const payload = JSON.parse(payloadJson);
            return payload;
        } catch (error) {
            console.error("Error decoding mock JWT:", error);
            return null;
        }
    },
};

export default Auth;