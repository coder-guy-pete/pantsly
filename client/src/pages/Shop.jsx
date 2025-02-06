import React, { useState, useMemo, useEffect } from 'react';
import { Box, Heading, Highlight, Flex, Center, Spinner, Text } from '@chakra-ui/react';
import ProductCard from '@/components/ProductCard';
// import Products from '@/mock-data/Products';
import SearchBar from '@/components/SearchBar';
import SortFilter from '@/components/SortFilter';

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [sortOption, setSortOption] = useState('name');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/inventory/products');
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error);
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddToCart = (product, size, color) => {
        setCartItems([...cartItems, { ...product, size, color }]);
    };

    const handleRemoveFromCart = (product) => {
        setCartItems(cartItems.filter((item) => item.product_group_id !== product.product_group_id));
    };

    const isProductInCart = (product) =>
        cartItems.some((item) => item.product_group_id === product.product_group_id);
    
    const handleSortChange = (option) => {
        setSortOption(option);
    };
    
    const handleBrandFilterChange = (brands) => {
        setSelectedBrands(brands);
    };

    const filteredAndSortedProducts = useMemo(() => {
        if (!products) return [];

        const lowerCaseQuery = searchQuery.toLowerCase();

        let filtered = products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(lowerCaseQuery);
            const brandMatch = (!selectedBrands || selectedBrands.length === 0) || (selectedBrands && selectedBrands.includes(product.brand));
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
    }, [searchQuery, products, sortOption, selectedBrands]);

    if (loading) {
        return (
            <Center>
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return <Center h="100vh"><Text color="red.500">Error: {error.message}</Text></Center>
    }

    if (!products || products.length === 0) {
        return <Text>No products found.</Text>;
    }

    return (
        <Box p={4}>
            <Heading size="3xl" ml={10} mb={5}>
                <Highlight query="Pantsly:" styles={{ color: 'teal.600' }}>
                Pantsly: Pants with passion
                </Highlight>
            </Heading>
            <SearchBar onSearch={handleSearch} />

            <Flex gap={10} direction={{ base: 'column', md: 'row' }}>
            <SortFilter 
                products={products} 
                onSortChange={handleSortChange} 
                onBrandFilterChange={handleBrandFilterChange} 
            /> 
            <Flex gap={10} justify="center" wrap="wrap">
                {filteredAndSortedProducts.map(product => (
                    <Box key={product.product_group_id} w={{ base: "100%", md: "45%", lg: "30%" }}>
                        <ProductCard
                            key={product.product_group_id}
                            product={product}
                            as="article"
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                            cartItems={cartItems}
                        />
                    </Box>
                ))}
            </Flex>
            </Flex>
        </Box>
    );
};

export default Shop;