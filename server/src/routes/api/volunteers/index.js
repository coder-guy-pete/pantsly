import express from 'express';
const router = express.Router();
import volunteerRoutes from './volunteer.js';
import { helloVolunteers } from '../../../controllers/volunteers/hello.js';

router.use('/volunteer', volunteerRoutes);
router.get('/', helloVolunteers);

export default router;
