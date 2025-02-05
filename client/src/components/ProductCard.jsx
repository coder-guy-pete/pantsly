import React, { useState, useMemo, useEffect } from 'react';
import { Box, Image, Text, Flex, Button, VStack, Card, createListCollection, Center, Spinner } from '@chakra-ui/react';
import ProductModal from './ProductModal';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from './ui/select';

const ProductCard = ({ product, addToCart, removeFromCart, isProductInCart }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/inventory/products');
                if (!response.ok) {
                    throw new Error(`Failed to fetch product details: ${response.status}`);
                }
                const data = await response.json();
            } catch (error) {
                setError(error);
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (product && product.product_group_id) {
            fetchProductDetails();
        } else {
            setLoading(false);
        }
    }, [product]);

    // NEED TO UPDATE THIS WITH API FETCH CALLS LATER
    const sizeOptions = useMemo(() => {
        const uniqueSizes = [...new Set(product.product_group_id.sizes)];
        return createListCollection({
            items: uniqueSizes.map(size => ({ value: size, label: size })),
            itemToString: (item) => item.label,
            itemToValue: (item) => item.value,
        });
    }, [product.sizes]);

        // UPDATE THIS WITH API FETCH CALLS LATER
    const colorOptions = useMemo(() => {
        const uniqueColors = [...new Set(product.product_group_id.colors)];
        return createListCollection({
            items: uniqueColors.map(color => ({ value: color, label: color })),
            itemToString: (item) => item.label,
            itemToValue: (item) => item.value,
        });
    }, [product.colors]);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product);
    };

    const handleProductModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    if (loading) {
        return <Center h="100vh"><Spinner size="lg" /></Center>;
    }

    if (error) {
        return <Center h="100vh"><Text color="red.500">Error: {error.message}</Text></Center>;
    }

    if (!productDetails) {
        return <Text>Product details unavailable.</Text>;
    }
    
    return (
        <Box>
            <Card.Root borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md" minW="350px">
                <Card.Body gap="2">
                <Image 
                    src={product.image_url} 
                        alt={product.name} 
                        rounded="md"
                        w="75%"
                        mb={4} 
                        />
                <VStack align="start" spacing={2}>
                    <Card.Title fontWeight="bold" fontSize="lg">{product.name}</Card.Title>
                    <Text color="gray.600" fontSize="sm">{product.brand}</Text>
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="md" color="teal.500">${product.sell_price}</Text>
                    </Flex>

                <Flex gap={5}>
                    <SelectRoot 
                        onChange={handleSizeChange} 
                        size="sm"
                        mb={2} 
                        collection={sizeOptions}
                        disabled={product.sizes.length === 0}>
                    <SelectLabel>Size</SelectLabel>
                    <SelectTrigger minWidth="100px">
                        <SelectValueText />
                    </SelectTrigger>
                    <SelectContent>
                        {sizeOptions.items.map((item) => (
                            <SelectItem key={item.value} item={item}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>

                <SelectRoot 
                    onChange={handleColorChange} 
                    size="sm"
                    collection={colorOptions}
                    disabled={product.colors.length === 0}>
                    <SelectLabel>Color</SelectLabel>
                    <SelectTrigger minWidth="100px">
                        <SelectValueText />
                    </SelectTrigger>
                    <SelectContent>
                        {colorOptions.items.map((item) => (
                            <SelectItem key={item.value} item={item}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                </Flex>

                <Flex gap={5}>
                    {isProductInCart ? (
                        <Button size="sm" colorPalette="red" onClick={handleRemoveFromCart}>Remove from Cart</Button>
                    ) : (
                        <Button size="sm" colorPalette='teal' onClick={handleAddToCart}>Add to Cart</Button>
                    )}
                    <Button size="sm" variant="outline" onClick={handleProductModal}>Product Details</Button>
                </Flex>
                </VStack>
                </Card.Body>
            </Card.Root>

            <ProductModal
                        open={isModalOpen}
                        onOpenChange={handleProductModal}
                        product={product} 
                    />
        </Box>
    );
};

export default ProductCard;