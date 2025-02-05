// import { Product } from '../../models/index.js';

import tempDataProduct from '../tempDataProduct.js';


export const productGet = async (req, res) => {
    const response = tempDataProduct.filter((product) => product.product_group_id === req.params.id);
    res.json(response);
};