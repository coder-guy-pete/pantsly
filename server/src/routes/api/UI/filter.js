import express from 'express';
const router = express.Router();
import { filterGet } from '../../../controllers/UI/filter.js';

// GET api/UI/filter
router.get('/', filterGet);

export default router;