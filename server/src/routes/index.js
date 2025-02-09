import { Router } from 'express';
import authRoutes from './auth-routes.js';
import api from './api/index.js';
// import { authToken } from '../middleware/auth.js';

const router = Router();

router.use('/api', api);

// localhost:5173/
router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.use('/auth', authRoutes);
router.use('/api', authRoutes); // Add authToken once done testing auth routes

export default router;
