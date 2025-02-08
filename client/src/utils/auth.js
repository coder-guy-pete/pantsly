import { mockUsers } from '../mock-data/Users';

const authService = {
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

    login: async (email, password) => {
        console.log('this inside login', this);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('this inside setTimeout (login)', this);
                const user = mockUsers.find(user => user.email === email && user.password === password)
                if (user) {
                    const mockToken = this.generateMockJWT(user)
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
};

export default authService;