import React, { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import Products from '../mock-data/Products';

const ProductList = () => {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product, size, color) => {
        setCartItems([...cartItems, { ...product, size, color }]);
    };

    const handleRemoveFromCart = (product) => {
        setCartItems(cartItems.filter((item) => item.id !== product.id));
    };

    const isProductInCart = (product) => cartItems.some((item) => item.id === product.id);

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {Products.map((product) => (
                <ProductCard 
                key={product.product_id} 
                product={product}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                isProductInCart={isProductInCart(product)}
                />
            ))}
        </Grid>
    );
};

export default ProductList;