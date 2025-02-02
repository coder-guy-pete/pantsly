import React, { useState, useEffect, useCallback } from 'react';
import { Box, Image, Text, Flex, Button, VStack } from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from './ui/select';
import Products from '@/mock-data/Products';

const ProductCard = ({ product, addToCart, removeFromCart, isProductInCart }) => {
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    // REPLACE THIS WITH API FETCH CALLS LATER
    useEffect(() => {
        setSizes(product.sizes);
    }, []);

    useEffect(() => {
        setColors(product.colors);
    }, []);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product);
    };

    // ONCHANGE HANDLERS are not working as expected, need to debug
    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
        console.log("Sizes:", sizes);
        console.log("Selected Size: ", event.target.value);
        console.log("Selected Size is a string?", typeof event.target.value === 'string');
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
        console.log("Selected Color:", event.target.value);
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={product.image_url} alt={product.name} h="200px" objectFit="cover" mb={4} />
            <VStack align="start" spacing={2}>
                <Text fontWeight="bold" fontSize="lg">{product.name}</Text>
                <Text color="gray.600" fontSize="sm">{product.brand}</Text>
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="md" color="teal.500">${product.sell_price}</Text>
                </Flex>

                <SelectRoot 
                    value={selectedSize} 
                    onChange={handleSizeChange} 
                    size="sm" 
                    mb={2} 
                    disabled={sizes.length === 0}>
                <SelectLabel>Size</SelectLabel>
                <SelectTrigger>
                    <SelectValueText />
                </SelectTrigger>
                <SelectContent>
                    {sizes.map((size) => (
                        <SelectItem key={size} item={size} value={size}>
                            {size}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            <SelectRoot 
                value={selectedColor} 
                onChange={handleColorChange} 
                size="sm" 
                disabled={colors.length === 0}>
                <SelectLabel>Color</SelectLabel>
                <SelectTrigger>
                    <SelectValueText />
                </SelectTrigger>
                <SelectContent>
                    {colors.map((color) => (
                        <SelectItem key={color} item={color} value={color}>
                            {color}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

                {isProductInCart ? (
                    <Button size="sm" colorScheme="red" onClick={handleRemoveFromCart}>Remove from Cart</Button>
                ) : (
                    <Button size="sm" colorScheme="teal" onClick={handleAddToCart}>Add to Cart</Button>
                )}
            </VStack>
        </Box>
    );
};

export default ProductCard;