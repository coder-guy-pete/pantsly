// import { Product } from '../../models/index.js';
import { Op } from 'sequelize';
import tempData from '../tempdata.js';


// search GET
export const searchGet = async (req, res) => {
    res.json(tempData);

    //THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
    try {
        const products = await Product.findAll({
            attributes: ['productId', 'product_name', 'brand', 'color', 'size', 'sell_price', 'stock_quantity', 'image_url'],
            where:
                {
                    product_name: {
                        [Op.like]: `%${req.body.query}%`
                    },
                },

        });

        if (!products) {
            return res.json([]);
        } else {
            const productMap = productResponse(products);

            return res.json(Object.values(productMap));
        }

    } catch (error) {
        console.error(error);
        res.status(500).json([])
    }
}