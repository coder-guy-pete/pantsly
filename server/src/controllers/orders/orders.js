// import { Orders, OrderItem, ProductVariants } from '../../models/index.js';
// import Op from 'sequelize';

import tempDataOrderHistory from '../tempDataOrderHistory.js';

// Order GET
export const ordersGet = async (req, res) => {
    res.json(tempDataOrderHistory);
    console.log(`This is the order history for the user with the user id ${req.params.user_id}`);

    // THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
    // try {
    //     const orders = await Orders.findAll({  
    //         where: {
    //             user_id: req.params.user_id,
    //         },
    //         include: [
    //             {
    //                 model: OrderItem,
    //                 include: [
    //                     {
    //                         model: ProductVariants,
    //                         attributes: ['name', 'brand', 'color', 'size', 'sell-price', 'image_url']
    //                     }
    //                 ]
    //             }
    //         ],
    //         order: [['purchase_date', 'DESC']],
    //     });

    //     if (!orders) {
    //         return res.json([]);
    //     } else {
    //         const formattedOrders = orders.map((order) => {
    //             let totalOrderAmount = 0;

    //             const orderItems = orders.OrderItems.map((orderItem) => {
    //                 const product = orderItem.ProductVariant;
    //                 const orderItemTotal = orderItem.purchase_quantity * product.sell_price;
    //                 totalOrderAmount += orderItemTotal;

    //                 return {
    //                     name: `${product.brand} ${product.name}`,
    //                     color: product.color,
    //                     size: product.size,
    //                     quantity: orderItem.purchase_quantity,
    //                     image_url: product.image_url,
    //                 };
    //             });

    //             return {
    //                 order_id: order.id,
    //                 purchase_date: new Date(order.purchase_date).toLocaleDateString(),
    //                 fulfillment_date: order.fulfillment_date === 'pending' ? 'Pending' : new Date(order.fulfillment_date).toLocaleDateString(),
    //                 total: totalOrderAmount,
    //                 items: orderItems,

    //             };
    //         });
    //         return res.json(formattedOrders);
    //     }}
    //     catch (error) {
    //         console.error('Error fetching order history: ', error);
    //         res.status(500).json([]);
    //     }
};

// Order POST
export const ordersPost = async (req, res) => {
    res.json({message: `Placeholder for orderPost. Will be used to create new order with a post to api/orders/`})

    // THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
    
    const t = await sequelize.transaction();
    
    try {
        
        const newOrder = await Orders.create({
            user_id: req.body.user_id,
            purchase_date: new Date(),

        })
        
        const product_id = await ProductVariants.findOne({
            where: {
                product_group_id: 
            }
        })

    } catch {

    }
}