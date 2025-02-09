import { Orders, OrderItem, ProductVariants } from '../../models/index.js';
import sequelize from '../../config/connection.js';


// import tempDataOrderHistory from '../tempDataOrderHistory.js';

// Order GET
export const ordersGet = async (req, res) => {
    // res.json(tempDataOrderHistory);
    // console.log(`This is the order history for the user with the user id ${req.params.user_id}`);

    // THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
    try {
        const orders = await Orders.findAll({  
            where: {
                user_id: req.params.user_id,
            },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: ProductVariants,
                            attributes: ['name', 'brand', 'color', 'size', 'sell_price', 'image_url']
                        }
                    ]
                }
            ],
            order: [['purchase_date', 'DESC']],
        });

        console.log('ORDERS:',orders);
        if (!orders) {
            return res.json([]);
        }  
        
        const plainOrders = orders.map((order) => order.get({plain: true}));
        
        const formattedOrders = plainOrders.map((order) => {
            let totalOrderAmount = 0;

            const orderItems = order.OrderItems.map((orderItem, index) => {
                const product = orderItem.ProductVariant;
                const orderItemTotal = orderItem.quantity * product.sell_price;
                totalOrderAmount += orderItemTotal;

                return {
                    id: index,
                    name: `${product.brand} ${product.name}`,
                    color: product.color,
                    size: product.size,
                    quantity: orderItem.quantity,
                    image_url: product.image_url,
                };
            });

            return {
                id: order.id,
                purchase_date: new Date(order.purchase_date).toLocaleDateString(),
                fulfillment_date: order.fulfillment_date === 'pending' ? 'Pending' : new Date(order.fulfillment_date).toLocaleDateString(),
                amount: totalOrderAmount*1.075,
                items: orderItems,

            };
        });
        return res.json(formattedOrders);
        }
        catch (error) {
            console.error('Error fetching order history: ', error);
            res.status(500).json([]);
        }
};

// Order POST
export const ordersPost = async (req, res) => {
    // res.json({message: `Placeholder for orderPost. Will be used to create new order with a post to api/orders/`})

    // THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
    
    const t = await sequelize.transaction();
    
    try {
        
        const newOrder = await Orders.create({
            user_id: req.body.user_id,
            purchase_date: new Date(),
        },
        {transaction: t})
        
        const orderItemsData = [];

        for (const orderItem of req.body.orderItems) {
            const product_variant_id = await ProductVariants.findOne({
                where: {
                    product_group_id: orderItem.product_group_id,
                    color: orderItem.color,
                    size: orderItem.size,
                }})
            const newOrderItem = {
                quantity: orderItem.quantity,
                product_variant_id: product_variant_id,
                order_id: newOrder.id,
            }
            orderItemsData.push(newOrderItem);
        };

        await OrderItem.bulkCreate(orderItemsData, {transaction: t});

        await t.commit();

        return res.status(200).json({message: 'Order successfully created.'});

    } catch (error) {
        console.error('Error creating order: ', error);
        await t.rollback();
        return res.status(500).json({message: 'Error creating order.'});
    }

}