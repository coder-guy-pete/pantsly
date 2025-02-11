import express from 'express';
const router = express.Router();
import users from './users/index.js';
import orders from './orders/index.js';
import products from './inventory/index.js';

router.use('/users', users);
router.use('/orders', orders);
router.use('/inventory', products);

// GET api/
router.get('/', (req, res) => {
  res.json({ message: 'Hello API!' });
});

export default router;
