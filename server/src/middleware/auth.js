import jwt from 'jsonwebtoken';

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const isAdmin = process.env.SECRET_ADMIN || '';

    if (authHeader && authHeader === isAdmin) {
        req.user = { email: 'admin@admin.com' };
        return next();
    }

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        const secretKey = process.env.JWT_SECRET_KEY || '';

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token expired or invavlid' });
            }

            req.user = user;
            return next();
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authToken;