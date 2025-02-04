// import {Variant} from '../../models/index.js';

// Variants GET
export const variantsGet = (req, res) => {
    res.json({message: 'Placeholder for variantsGet. Will retrieve all variants from the database'});
}

// Variants POST   
export const variantsPost = (req, res) => {
    res.json({message: 'Placeholder for variantsPost. Will be used to create new variant'});
}

// Variants PUT
export const variantsPut = (req, res) => {
    res.json({message: `Placeholder for variantsPut. Will update variant with ID: ${req.params.id} entered as a param for api/products/variants/:id`})};

// Variants DELETE
export const variantsDelete = (req, res) => {
    res.json({ message: `Placeholder for variantsDelete. Will delete variant with ID: ${req.params.id} entered as a param for api/products/variants/:id`})};