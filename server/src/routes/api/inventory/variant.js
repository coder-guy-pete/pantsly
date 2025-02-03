import express from 'express';
const router = express.Router();
import { variantGet } from '../../../controllers/inventory/variant.js';

// GET api/inventory/variants/variant/:id
router.get('/:id', variantGet);

export default router;