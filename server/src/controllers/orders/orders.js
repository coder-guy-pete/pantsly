// import { Order, OrderDetails } from '../../models/index.js';
import tempDataOrderHistory from '../tempDataOrderHistory.js';

// Order GET
export const ordersGet = async (req, res) => {
    res.json(tempDataOrderHistory);
    console.log(`This is the order history for the user with the user id ${req.params.user_id}`);
};

// Order POST
export const ordersPost = async (req, res) => {
    res.json({message: `Placeholder for orderPost. Will be used to create new order with a post to api/orders/`})
}