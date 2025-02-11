// import { Product } from '../../models/index.js';

// import tempDataProduct from '../tempDataProduct.js';


export const productGet = async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }
    
    const response = tempDataProduct.filter((product) => product.product_group_id === req.params.id);
    res.json(response);
};