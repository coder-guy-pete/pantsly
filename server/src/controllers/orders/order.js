// import { Order, OrderDetails } from '../../models/index.js';
import tempDataOrderHistory from '../tempDataOrderHistory.js';

// Order GET
export const orderGet = async (req, res) => {
    res.json(tempDataOrderHistory);
    console.log(`This is the order history for the user with user id ${req.params.id}`);
};