import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Flex, Button, VStack } from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from './ui/select'; // Make sure this path is correct

const ProductCard = ({ product, addToCart, removeFromCart, isProductInCart }) => {
    const sizes = product?.sizes || [];
    const colors = product?.colors || [];

    const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : '');
    const [selectedColor, setSelectedColor] = useState(colors.length > 0 ? colors[0] : '');

    useEffect(() => {
        if (sizes.length > 0) {
            setSelectedSize(sizes[0]);
        }
    }, [sizes]);

    useEffect(() => {
        if (colors.length > 0) {
            setSelectedColor(colors[0]);
        }
    }, [colors]);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product);
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

            <SelectRoot disabled={sizes.length === 0} value={selectedSize} onChange={setSelectedSize} size="sm" mb={2}>
                <SelectLabel>Size</SelectLabel>
                <SelectTrigger>
                    <SelectValueText />
                </SelectTrigger>
                <SelectContent>
                    {sizes.map((size, index) => (
                        <SelectItem key={size + index} value={size} item={size}> {/* Corrected line */}
                            {size}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            <SelectRoot disabled={sizes.length === 0} value={selectedColor} onChange={setSelectedColor} size="sm">
                <SelectLabel>Color</SelectLabel>
                <SelectTrigger>
                    <SelectValueText />
                </SelectTrigger>
                <SelectContent>
                    {colors.map((color, index) => (
                        <SelectItem key={color + index} value={color} item={color}> {/* Corrected line */}
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