import express from 'express';
const router = express.Router();
import { orderGet } from '../../../controllers/orders/order.js';

// TODO: Import the Order model here.
// User model being used as a temporary placeholder for setup

// GET api/orders/order/:id
router.get('/:id', orderGet);

export default router;