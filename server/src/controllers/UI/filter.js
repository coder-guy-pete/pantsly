// import { Product } from '../../models/index.js';
import { Op } from 'sequelize';
import tempData from '../tempdata.js';
import productResponse from '../utils/productResponse.js';

// filter GET
export const filterGet = async (req, res) => {
    res.json(tempData);

    // //THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
    // try {
    //     const products = await Product.findAll({
    //     attributes: ['productId', 'product_name', 'brand', 'color', 'size', 'sell_price', 'stock_quantity', 'image_url'],
    //     where:
    //         {
    //             [Op.and]: [
    //                 {brand: req.body.brand},
    //                 {color:req.body.color},
    //                 {size:req.body.size},
    //             ]
    //         }

    //     })

    //     if (!products) {
    //         return res.json([]);
    //     } else {
    //         const filteredProducts = productResponse(products);

    //         return res.json(Object.values(filteredProducts));
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json([]);
    // }

}


export const filterOptionsGet = (req, res) => {
    res.json({message: 'Placeholder for filterOptionsGet. Will retrieve filter options for products'})
}