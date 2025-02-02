import express from 'express';
const router = express.Router();
import userRoutes from './user.js';


router.use('/user', userRoutes);

router.get('/', (req, res) => {
    res.json({message: 'Hello users top level API!'});
});

export default router;
