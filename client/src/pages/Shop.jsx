import React from 'react';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';

// Placeholder components until I setup the actual components
const Navbar = () => <Box as="nav">Navbar Placeholder</Box>;
const SearchBar = () => <Box>Search Bar Placeholder</Box>;
const SortFilter = () => <Box>Sort & Filter Placeholder</Box>;
const ProductList = () => 
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        {/* ... more ProductCards */}
    </Grid>;
const ProductCard = () => <Box>Product Card Placeholder</Box>;


const Shop = () => {
    return (
        <Box>
        <Navbar />

        <Flex direction="column" p={4}>
            <Heading as="h1" size="xl" mb={4}>Shop</Heading>

            <Flex direction="row" mb={4}>
            <Box flex={1}>
                <SearchBar />
            </Box>
            <Box>
                <SortFilter />
            </Box>
            </Flex>

            <ProductList />
        </Flex>
        </Box>
    );
};

export default Shop;