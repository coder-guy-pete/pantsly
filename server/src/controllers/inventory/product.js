import { ProductVariants } from '../../models/index.js';
import productsResponse from '../utils/productsResponse.js';

export const productGet = async (req, res) => {
    try {
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID" })
        };

        const products = await ProductVariants.findOne({
        attributes: ['product_group_id', 'name', 'brand', 'color', 'size', 'sell_price', 'image_url', 'description',],
        raw: true,
        where: {
            id: req.params.id,
        }
        });

        if (!products) {
            return res.json([]);
        } else {
            const productMap = productsResponse(products);

            return res.json(Object.values(productMap));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json([]);
    }
};