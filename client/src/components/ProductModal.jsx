import React from 'react';
import {
    DialogRoot,
    DialogBackdrop,
    DialogTrigger, // If you want a trigger element outside the dialog
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogCloseTrigger,
    Button,
    Image,
    Text,
    Flex,
    VStack,
} from '@chakra-ui/react';

const ProductModal = ({ open, onOpenChange, product }) => {
    const cancelRef = React.useRef();

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

                            <Flex>
                                <Text fontWeight="bold">Sizes:</Text>
                                <Text ml={2}>{product.sizes.join(', ')}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="bold">Colors:</Text>
                                <Text ml={2}>{product.colors.join(', ')}</Text>
                            </Flex>
                        </VStack>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Button colorPalette="red" onClick={() => onOpenChange(false)} ref={cancelRef}>
                        Cancel
                    </Button>
                    <Button colorPalette="teal" ml={3}>
                        Add to Cart
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

export default ProductModal;