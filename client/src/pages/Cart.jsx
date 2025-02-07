import React from 'react';
import { Box, Image, Button, VStack, Table, Heading, EmptyState, Card, Flex, Text } from '@chakra-ui/react';
import { LuShoppingCart } from 'react-icons/lu';

const Cart = ({ cartItems, setCartItems }) => {

    const totalPrice = cartItems.reduce((total, item) => total + item.sell_price * item.quantity, 0);

    const [userInfo, setUserInfo] = React.useState({
        name: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleQuantityChange = (product, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.product_group_id === product.product_group_id && item.size === product.size && item.color === product.color) { // Match on product and variation
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleInputChange = (e) => {
        setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
    };

    const handleCheckout = () => {
        // NEED TO IMPLEMENT ACTUAL CHECKOUT FUNCTIONALITY
        console.log("Order Information:", orderInfo);
        console.log("Cart Items:", cartItems);

        setCartItems([]);
        // Add route to order history
        alert("Order placed successfully! (This is a mock checkout.)");
    };

    const handleRemoveFromCart = (product) => {
        const updatedCartItems = cartItems.filter(item => item.product_group_id !== product.product_group_id || item.size !== product.size || item.color !== product.color); // Match on product and variation
        setCartItems(updatedCartItems);
    };

    if (cartItems.length === 0) {
        return (
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                    <LuShoppingCart />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                    <EmptyState.Title>Your cart is empty</EmptyState.Title>
                    <EmptyState.Description>
                        Explore our products and add items to your cart
                    </EmptyState.Description>
                    </VStack>
                </EmptyState.Content>
                </EmptyState.Root>
            )
        };

    console.log(cartItems);

    return (
        <Flex justify="space-evenly">
        <Box p={4}>
            <Heading as="h2" size="2xl" fontWeight="bold" mb={4}>Shopping Cart</Heading>
            <Table.Root size="lg" interactive stickyHeader>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Image</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Product</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Brand</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="xl">Item Price</Table.ColumnHeader>
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
                                {`$${item.sell_price*item.quantity}`} 
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

        <Card.Root p={4} w="300px">
            <Card.Header>
                <Card.Title>Order Summary</Card.Title>
            </Card.Header>
            <Card.Body>
                <VStack align="start" spacing={4}>
                    <Text>Subtotal: ${totalPrice}</Text>
                    <Text>Tax: ${(totalPrice * 0.07).toFixed(2)}</Text>
                    <Text fontWeight="bold">Total: ${(totalPrice * 1.07).toFixed(2)}</Text>
                    <Button colorPalette="teal" size="lg" isFullWidth>Checkout</Button>
                </VStack>
            </Card.Body>
        </Card.Root>
        </Flex>
    );
};

export default Cart;