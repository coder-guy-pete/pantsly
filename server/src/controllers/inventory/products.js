// import { Product } from '../../models/index.js';
import tempData from '../tempdata.js';
import productResponse from '../utils/productResponse.js';

// // Products GET
export const productsGet = async (req, res) => {
    res.json(tempData);

//THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
//     try {
//         const products = await Product.findAll({
//         attributes: ['productId', 'product_name', 'brand', 'color', 'size', 'sell_price', 'stock_quantity', 'image_url'],
//         raw: true,
//         });

//         if (!products) {
//             return res.json([]);
//         } else {
//             const productMap = productResponse(products);

//             return res.json(Object.values(productMap));
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json([]);
//     }
}


// Products POST
export const productsPost = async (req, res) => {
    res.json({message: 'Placeholder for productsPost. Will be used to create new product'});
}

// Products PUT
export const productsPut = async (req, res) => {
    res.json({message: `Placeholder for productsPut. Will update product with ID: ${req.params.id} entered as a param for api/products/:id`})};

// Products DELETE
export const productsDelete = async (req, res) => {
    res.json({ message: `Placeholder for productsDelete. Will delete product with ID: ${req.params.id} entered as a param for api/products/:id`});
}