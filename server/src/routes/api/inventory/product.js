import express from 'express';
const router = express.Router();

import { productGet } from '../../../controllers/inventory/product.js';

// GET api/inventory/products/product/:id
router.get('/:id', productGet);

export default router;