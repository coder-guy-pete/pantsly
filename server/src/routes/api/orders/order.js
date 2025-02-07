import express from 'express';
const router = express.Router();
import { orderGet } from '../../../controllers/orders/order.js';

// GET api/orders/order/:id
router.get('/:id', orderGet);

export default router;