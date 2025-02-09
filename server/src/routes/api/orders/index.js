import express from 'express';
const router = express.Router();
import order from './order.js';
import { ordersGet, ordersPost } from '../../../controllers/orders/orders.js';


router.use('/order', order);

// GET api/orders/:user_id
router.get('/:user_id', ordersGet);

// POST api/orders - will be used when creating a new order on cart submit
router.post('/', ordersPost);


export default router;