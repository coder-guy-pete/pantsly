// import { Orders, OrderItem, ProductVariants from '../../models/index.js';
// import Op from 'sequelize';

import tempDataOrderHistory from '../tempDataOrderHistory.js';

// Order GET
export const ordersGet = async (req, res) => {
    res.json(tempDataOrderHistory);
    console.log(`This is the order history for the user with the user id ${req.params.user_id}`);

    // THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
//     try {
//         const orders = await Orders.findAll({  
//             where: {
//                 user_id: req.params.user_id,
//             },
//             include: [
//                 {
//                     model: OrderItem,
//                     include: [
//                         {
//                             model: ProductVariants,
//                             attributes: ['product_name', 'description', 'color', 'size', 'sell-price', 'image_url']
//                         }
//                     ]
//                 }
//             ],
//             order: [['purchase_date', 'DESC']],
//         });

//         if (!orders) {
//             return res.json([]);
//         } else {
//             const formattedOrders = orders.map((order) => {
//                 let totalOrderAmount = 0;

//                 const orderItems = orders.OrderItems.map((orderItem) => {

//                 })
//             })

//         }
//         }
};

// Order POST
export const ordersPost = async (req, res) => {
    res.json({message: `Placeholder for orderPost. Will be used to create new order with a post to api/orders/`})
}