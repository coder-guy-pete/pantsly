import React from 'react';
import { Grid } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import Products from '../mock-data/Products'; // Import your mock products

const ProductList = () => {
    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {Products.map((product) => ( // Use Products directly
                <ProductCard key={product.product_id} product={product} /> // Key should be product_id
            ))}
        </Grid>
    );
};

export default ProductList;