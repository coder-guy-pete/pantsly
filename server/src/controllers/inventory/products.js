// import ProductVariants from '../../models/index.js';

import tempData from '../tempDataProduct.js';
// import productResponse from '../utils/productResponse.js';

// // Products GET
export const productsGet = async (req, res) => {
    res.json(tempData);

//THE CODE BELOW WILL REPLACE THE CODE ABOVE ONCE THE DATABASE IS PROPERLY CONNECTED
//     try {
//         const products = await ProductVariants.findAll({
//         attributes: ['productId', 'product_name'],
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


// Products POST - relevant for building the inventory side of the platform
export const productsPost = async (req, res) => {
    res.json({message: 'Placeholder for productsPost. Will be used to create new product'});
}

// Products PUT - relelant for building the inventory side of the platform
export const productsPut = async (req, res) => {
    res.json({message: `Placeholder for productsPut. Will update product with ID: ${req.params.id} entered as a param for api/products/:id`})};

// Products DELETE - relevant for building the inventory side of the platform
export const productsDelete = async (req, res) => {
    res.json({ message: `Placeholder for productsDelete. Will delete product with ID: ${req.params.id} entered as a param for api/products/:id`});
}