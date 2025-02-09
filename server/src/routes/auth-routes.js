import { Router } from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'Authentication failed' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Server error' }); // Return error response
    }
});

export default router;