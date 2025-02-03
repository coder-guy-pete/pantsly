import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Flex, Button, VStack, Card } from '@chakra-ui/react';
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
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleProductModal = () => {
        setIsModalOpen(!isModalOpen);
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
        <Box position="relative">
            <Card.Root borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
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
                        value={selectedSize} 
                        onChange={handleSizeChange} 
                        size="sm"
                        mb={2} 
                        disabled={sizes.length === 0}>
                    <SelectLabel>Size</SelectLabel>
                    <SelectTrigger minWidth="100px">
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
                    <SelectTrigger minWidth="100px">
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