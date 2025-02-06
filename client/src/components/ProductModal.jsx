import React, { useState, useMemo, useEffect } from 'react';
import {
    DialogRoot,
    DialogBackdrop,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    Button,
    Image,
    Text,
    Flex,
    VStack,
    createListCollection
} from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from './ui/select';

const ProductModal = ({ open, onOpenChange, product, addToCart, removeFromCart, isInCart}) => {
    const cancelRef = React.useRef();
    const [selectedSize, setSelectedSizeModal] = useState('');
    const [selectedColor, setSelectedColorModal] = useState('');
    const [availableColors, setAvailableColors] = useState([]);

    useEffect(() => {
        if (product && selectedSize) {
            setAvailableColors(product.colors[selectedSize] || []);
        } else {
            setAvailableColors([]);
        }
    }, [selectedSize, product]);

    const sizeOptionsModal = useMemo(() => {
        if (product && product.sizes) {
            return createListCollection({
                items: product.sizes.map(size => ({ value: size, label: size })),
                itemToString: (item) => item.label,
                itemToValue: (item) => item.value,
            });
        }
        return createListCollection({ items: [] });
    }, [product?.sizes]);

    const colorOptionsModal = useMemo(() => {
        return createListCollection({
            items: availableColors.map(color => ({ value: color, label: color })),
            itemToString: (item) => item.label,
            itemToValue: (item) => item.value,
        });
    }, [availableColors]);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
        product.isInCart = true;
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product);
        product.isInCart = false;
    };

    const handleSizeChangeModal = (event) => {
        setSelectedSizeModal(event.target.value);
    };

    const handleColorChangeModal = (event) => {
        setSelectedColorModal(event.target.value);
    };

    if (!product) {
        return null;
    }

    return (
        <DialogRoot open={open} onOpenChange={onOpenChange}>
            <DialogBackdrop />
            <DialogContent maxW="md" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Flex direction="column">
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            maxW="md"
                            rounded="md"
                            p={4}
                            mb={4}
                        />

                        <VStack align="start" spacing={2}>
                            <Text fontWeight="bold" fontSize="xl">{product.name}</Text>
                            <Text color="gray.600" fontSize="md">{product.brand}</Text>
                            <Text fontSize="lg" color="teal.500">${product.sell_price}</Text>
                            <Text>{product.description}</Text>

                            <Flex gap={5}>
                                <SelectRoot
                                    onChange={handleSizeChangeModal}
                                    size="sm"
                                    mb={2}
                                    collection={sizeOptionsModal}
                                    disabled={product.sizes?.length === 0}
                                >
                                    <SelectLabel>Size</SelectLabel>
                                    <SelectTrigger minWidth="100px">
                                        <SelectValueText />
                                    </SelectTrigger>
                                    <SelectContent portalled={false}>
                                        {sizeOptionsModal.items.map((item) => (
                                            <SelectItem key={item.value} item={item}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>

                                <SelectRoot
                                    onChange={handleColorChangeModal}
                                    size="sm"
                                    collection={colorOptionsModal}
                                    disabled={availableColors.length === 0}
                                >
                                    <SelectLabel>Color</SelectLabel>
                                    <SelectTrigger minWidth="100px">
                                        <SelectValueText />
                                    </SelectTrigger>
                                    <SelectContent portalled={false}>
                                        {colorOptionsModal.items.map((item) => (
                                            <SelectItem key={item.value} item={item}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            </Flex>
                        </VStack>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Button size="sm" colorPalette="red" onClick={() => onOpenChange(false)} ref={cancelRef}>
                        Cancel
                    </Button>
                    {isInCart ? (
                        <Button size="sm" colorPalette="red" onClick={handleRemoveFromCart}>Remove from Cart</Button>
                        ) : (<Button size="sm" colorPalette="teal" ml={3} onClick={handleAddToCart}>Add to Cart</Button>
                        )}
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

export default ProductModal;