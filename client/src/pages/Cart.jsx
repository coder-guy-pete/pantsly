import React from 'react';
import { Box, Image, Text, Flex, Button, VStack, Table, Heading } from '@chakra-ui/react';

const Cart = ({ cartItems, setCartItems }) => {

    const handleQuantityChange = (product, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.product_group_id === product.product_group_id && item.size === product.size && item.color === product.color) { // Match on product and variation
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleRemoveFromCart = (product) => {
        const updatedCartItems = cartItems.filter(item => item.product_group_id !== product.product_group_id || item.size !== product.size || item.color !== product.color); // Match on product and variation
        setCartItems(updatedCartItems);
    };

    if (cartItems.length === 0) {
        return <Text>Your cart is empty.</Text>;
    }

    return (
        <Box p={4}>
            <Heading as="h2" size="2xl" fontWeight="bold" mb={4}>Shopping Cart</Heading>
            <Table.Root size="lg" interactive stickyHeader>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Image</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Product</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Brand</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {cartItems.map(item => (
                        <Table.Row key={`${item.product_group_id}-${item.size}-${item.color}`}>
                            <Table.Cell><Image src={item.image_url} alt={item.name} w="150px" rounded="md" /></Table.Cell> {/* Smaller image */}
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.brand}</Table.Cell>
                            <Table.Cell>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))}
                                    min="1"
                                    style={{ width: '50px', padding: '4px', border: '1px solid #ccc' }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Button colorScheme="red" size="sm" onClick={() => handleRemoveFromCart(item)}>
                                    Remove
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    );
};

export default Cart;