import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import ProductDisplay from './ProductDisplay';
import ProductModal from './ProductModal';

const ProductCard = ({ product, addToCart, removeFromCart, isProductInCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    
    return (
        <Box>
            <ProductDisplay
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                isProductInCart={isProductInCart}
                isModal={isModalOpen}
                onClose={handleProductModal}
            />
            <ProductModal
                open={isModalOpen}
                onOpenChange={handleProductModal}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                isProductInCart={isProductInCart}
            />
        </Box>
    );
};

export default ProductCard;