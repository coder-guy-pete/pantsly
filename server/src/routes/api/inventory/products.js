import express from 'express';
const router = express.Router();
import { productsGet, productsPost, productsPut, productsDelete } from '../../../controllers/inventory/products.js';
import productRoutes from './product.js';

router.use('/product', productRoutes);

// GET api/inventory/products/
router.get('/', productsGet);

// POST api/inventory/products/
router.post('/', productsPost);

// PUT api/inventory/products/:id
router.put('/:id', productsPut);

// DELETE api/inventory/products/:id
router.delete('/:id', productsDelete);

export default router;