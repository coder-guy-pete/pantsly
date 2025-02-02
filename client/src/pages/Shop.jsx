import React, { useState, useMemo } from 'react';
import { Box, Heading, Highlight, Grid } from '@chakra-ui/react';
import ProductCard from '@/components/ProductCard';
import Products from '@/mock-data/Products';
import SearchBar from '@/components/SearchBar';

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]); // Cart items moved here

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddToCart = (product, size, color) => { // Moved here
        setCartItems([...cartItems, { ...product, size, color }]);
    };

    const handleRemoveFromCart = (product) => { // Moved here
        setCartItems(cartItems.filter((item) => item.product_id !== product.product_id)); // Use product_id
    };

    const isProductInCart = (product) =>  // Moved here
        cartItems.some((item) => item.product_id === product.product_id); // Use product_id

    const filteredProducts = useMemo(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return Products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery)
        );
    }, [searchQuery, Products]);

    return (
        <Box p={4}>
            <Heading size="3xl" ml={10} mb={5}>
                <Highlight query="Pantsly:" styles={{ color: 'teal.600' }}>
                Pantsly: Pants with passion
                </Highlight>
            </Heading>
            <SearchBar onSearch={handleSearch} />
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        addToCart={handleAddToCart} // Pass the handler
                        removeFromCart={handleRemoveFromCart} // Pass the handler
                        isProductInCart={isProductInCart(product)} // Pass the function
                    />
                ))}
            </Grid>
        </Box>
    );
};

export default Shop;