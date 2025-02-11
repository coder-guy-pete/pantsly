import { ProductVariants } from '../../models/index.js';
import { Op } from 'sequelize';
import productsResponse from '../utils/productsResponse.js';


// search GET
export const searchGet = async (req, res) => {
    try {
        const products = await ProductVariants.findAll({
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
            const productMap = productsResponse(products);

            return res.json(Object.values(productMap));
        }

    } catch (error) {
        console.error(error);
        res.status(500).json([])
    }
}