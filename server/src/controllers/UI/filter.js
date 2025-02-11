import { ProductVariants } from '../../models/index.js';
import { Op } from 'sequelize';
import productsResponse from '../utils/productsResponse.js';

// filter GET
export const filterGet = async (req, res) => {

    try {
        const products = await ProductVariants.findAll({
        attributes: ['productId', 'product_name', 'brand', 'color', 'size', 'sell_price', 'stock_quantity', 'image_url'],
        where:
            {
                [Op.and]: [
                    {brand: req.body.brand},
                    {color:req.body.color},
                    {size:req.body.size},
                ]
            }

        })

        if (!products) {
            return res.json([]);
        } else {
            const filteredProducts = productsResponse(products);

            return res.json(Object.values(filteredProducts));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json([]);
    }

}

