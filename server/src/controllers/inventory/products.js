// import { Product } from '../../models/index.js';
import tempData from './tempdata.js';

// Products GET
export const productsGet = async (req, res) => {
    res.json(tempData);

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