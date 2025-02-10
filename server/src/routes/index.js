import { Router } from 'express';
import authRoutes from './auth-routes.js';
import api from './api/index.js';
// import { authToken } from '../middleware/auth.js';

const router = Router();

// localhost:3001/
router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.get('/auth', (req, res) => {
  res.send('Hello Auth!');
});
router.use('/auth', authRoutes);
router.use('/api', api); // Add authToken once done testing auth routes

export default router;
