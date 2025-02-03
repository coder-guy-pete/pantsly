import express from 'express';
const router = express.Router();
import order from './order.js';
import { ordersGet, ordersPost } from '../../../controllers/orders/orders.js';


router.use('/order', order);

// GET api/orders
router.get('/', ordersGet);

// POST api/orders
router.post('/', ordersPost);


export default router;