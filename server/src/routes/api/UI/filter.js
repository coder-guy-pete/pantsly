import express from 'express';
const router = express.Router();
import { filterGet, filterOptionsGet } from '../../../controllers/UI/filter.js';

// GET api/UI/filter
router.get('/', filterGet);

router.get('/filterOptions', filterOptionsGet);

export default router;