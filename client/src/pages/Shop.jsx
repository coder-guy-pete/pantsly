import React, { useState, useMemo } from 'react';
import { Box, Heading, Highlight, Grid } from '@chakra-ui/react';
import ProductCard from '@/components/ProductCard';
import Products from '@/mock-data/Products';
import SearchBar from '@/components/SearchBar';
import SliderTool from '@/components/SliderTest';

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddToCart = (product, size, color) => {
        setCartItems([...cartItems, { ...product, size, color }]);
    };

    const handleRemoveFromCart = (product) => {
        setCartItems(cartItems.filter((item) => item.product_id !== product.product_id));
    };

    const isProductInCart = (product) =>
        cartItems.some((item) => item.product_id === product.product_id);

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
                        addToCart={handleAddToCart}
                        removeFromCart={handleRemoveFromCart}
                        isProductInCart={isProductInCart(product)}
                    />
                ))}
            </Grid>
        </Box>
    );
};

export default Shop;