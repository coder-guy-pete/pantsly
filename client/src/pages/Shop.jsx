import React, { useState, useMemo } from 'react';
import { Box, Heading, Highlight, Grid, Flex } from '@chakra-ui/react';
import ProductCard from '@/components/ProductCard';
import Products from '@/mock-data/Products';
import SearchBar from '@/components/SearchBar';
import SortFilter from '@/components/SortFilter';

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [sortOption, setSortOption] = useState('name');
    const [selectedBrands, setSelectedBrands] = useState([]);

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
    
    const handleSortChange = (option) => {
        setSortOption(option);
    };
    
    const handleBrandFilterChange = (brands) => {
        setSelectedBrands(brands);
    };

    const filteredAndSortedProducts = useMemo(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        let filtered = Products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(lowerCaseQuery);
            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            return nameMatch && brandMatch;
        });

        switch (sortOption) {
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.sell_price - b.sell_price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.sell_price - a.sell_price);
                break;
            default:
                break;
        }

        return filtered;
    }, [searchQuery, Products, sortOption, selectedBrands]);

    return (
        <Box p={4}>
            <Heading size="3xl" ml={10} mb={5}>
                <Highlight query="Pantsly:" styles={{ color: 'teal.600' }}>
                Pantsly: Pants with passion
                </Highlight>
            </Heading>
            <SearchBar onSearch={handleSearch} />

            <Flex gap={20}>
            <SortFilter 
                products={Products} 
                onSortChange={handleSortChange} 
                onBrandFilterChange={handleBrandFilterChange} 
            /> 
            <Grid templateColumns="repeat(3, 1fr)" gap={10} maxW="500px">
                {filteredAndSortedProducts.map(product => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        addToCart={handleAddToCart}
                        removeFromCart={handleRemoveFromCart}
                        isProductInCart={isProductInCart(product)}
                    />
                ))}
            </Grid>
            </Flex>
        </Box>
    );
};

export default Shop;