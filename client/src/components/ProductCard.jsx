import React, { useState, useMemo, useEffect } from 'react';
import { Box, Image, Text, Flex, Button, VStack, Card, createListCollection } from '@chakra-ui/react';
import ProductModal from './ProductModal';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from './ui/select';

const ProductCard = ({ product, addToCart, removeFromCart, cartItems }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [availableColors, setAvailableColors] = useState([]);
    const [isCurrentlyInCart, setIsCurrentlyInCart] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (product && selectedSize) {
            setAvailableColors(product.colors[selectedSize] || []);
        } else {
            setAvailableColors([]);
        }
    }, [selectedSize, product]);

    useEffect(() => {
        setIsCurrentlyInCart(checkIsProductInCart());
    }, [cartItems, product.product_id]);

    const checkIsProductInCart = () => {
        return cartItems.some((item) => item.product_id === product.product_id);
    };

    const sizeOptions = useMemo(() => {
        if (product && product.sizes) {
            return createListCollection({
                items: product.sizes.map(size => ({ value: size, label: size })),
                itemToString: (item) => item.label,
                itemToValue: (item) => item.value,
            });
        }
        return createListCollection({ items: []});
    }, [product?.sizes]);

    const colorOptions = useMemo(() => {
        return createListCollection({
            items: availableColors.map(color => ({ value: color, label: color })),
            itemToString: (item) => item.label,
            itemToValue: (item) => item.value,
        });
    }, [availableColors]);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
        setIsCurrentlyInCart(true);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product);
        setIsCurrentlyInCart(false);
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
    
    console.log("Cart Items: ", cartItems);
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
                        disabled={product.sizes?.length === 0}>
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
                    disabled={availableColors.length === 0}>
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
                    {isCurrentlyInCart ? (
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
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
        </Box>
    );
};

export default ProductCard;