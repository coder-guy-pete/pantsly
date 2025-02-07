import express from 'express';
const router = express.Router();
import productsRoutes from './products.js';

router.use('/products', productsRoutes);

// GET api/inventory/
router.get('/', (req, res) => {
  res.json({ message: 'This is the route for general inventory routes'});
});

export default router;