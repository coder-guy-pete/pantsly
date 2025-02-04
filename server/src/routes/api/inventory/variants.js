import express from 'express';
const router = express.Router();
import { variantsGet, variantsPost, variantsPut, variantsDelete } from '../../../controllers/inventory/variants.js';
import variantRoutes from './variant.js';

router.use('/variant', variantRoutes);

// GET api/inventory/variants
router.get('/', variantsGet);

// POST api/inventory/variants
router.post('/', variantsPost);

// PUT api/inventory/variants/:id
router.put('/:id', variantsPut);

// DELETE api/inventory/variants/:id
router.delete('/:id', variantsDelete);

export default router;
