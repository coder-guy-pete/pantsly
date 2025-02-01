import React, { useState } from 'react';
// import ProductModal from '../components/ProductModal';
import ProductList from '@/components/ProductList';
import ProductCard from '@/components/ProductCard';
import Products from '@/mock-data/Products';

// // Placeholder components until I setup the actual components
// const SearchBar = () => <Box>Search Bar Placeholder</Box>;
// const SortFilter = () => <Box>Sort & Filter Placeholder</Box>;


const Shop = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState(null);
    // const [cartItems, setCartItems] = useState([]); // State to manage cart items

    // const handleAddToCart = (product, size, color) => {
    //     setCartItems([...cartItems, { ...product, size, color }]);
    // };

    // const handleRemoveFromCart = (product) => {
    //     setCartItems(cartItems.filter((item) => item.id !== product.id));
    // };

    // const isProductInCart = (product) => cartItems.some((item) => item.id === product.id);

    // const openModal = (product) => {
    //     setSelectedProduct(product);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setSelectedProduct(null);
    //     setIsModalOpen(false);
    // };

    return (
        <div>
            <ProductList />
            {/* <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {mockProducts.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                isProductInCart={isProductInCart(product)}
                onClick={() => openModal(product)} // Open modal on card click
                />
            ))}
            </Grid> */}
    
            {/* <ProductModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} /> */}
        </div>
    );
};

export default Shop;