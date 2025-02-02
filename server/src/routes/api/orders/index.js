import express from 'express';
const router = express.Router();
import order from './order.js';

router.use('/order', order);

router.get('/', (req, res) => {
    res.json({message: 'This is the orders top level API route'});
});

export default router;