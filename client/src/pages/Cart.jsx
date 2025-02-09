import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Button, VStack, HStack, Table, Heading, EmptyState, Card, Flex, Text } from '@chakra-ui/react';
import { LuShoppingCart } from 'react-icons/lu';
import { AuthContext } from '../context/AuthContext';

const Cart = ({ cartItems, setCartItems }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const formattedSubTotal = subTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const handleQuantityChange = (product, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.product_group_id === product.product_group_id && item.size === product.size && item.color === product.color) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleCheckout = () => {
        if (user) {
            navigate('/checkout', { state: { cartItems, userInfo: user } });
        } else {
            navigate('/checkout', { state: { cartItems } });
        }
    };

    const handleRemoveFromCart = (product) => {
        const updatedCartItems = cartItems.filter(item => item.product_group_id !== product.product_group_id || item.size !== product.size || item.color !== product.color);
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

    return (
        <Box p={10}>
            <Heading as="h2" size="2xl" fontWeight="bold" mb={5}>Shopping Cart</Heading>
            <Flex gap={12}>
            <Table.Root size="lg" interactive stickyHeader>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader fontWeight="bold" fontSize="lg">Image</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="lg">Product</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="lg">Brand</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="lg">Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="lg">Item Price</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight="bold" fontSize="lg">Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {cartItems.map(item => (
                        <Table.Row key={`${item.product_group_id}-${item.size}-${item.color}`}>
                            <Table.Cell><Image src={item.image_url} alt={item.name} w="150px" rounded="md" /></Table.Cell>
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
                                {`$${(item.price*item.quantity).toFixed(2)}`}
                            </Table.Cell>
                            <Table.Cell>
                                <Button colorPalette="red" size="sm" onClick={() => handleRemoveFromCart(item)}>
                                    Remove
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        <Card.Root p={4} w="300px" h="fit-content">
            <Card.Header>
                <Card.Title>Order Summary</Card.Title>
            </Card.Header>
            <Card.Body>
                <VStack align="start" gap={4}>
                    <HStack>
                    <Text>Subtotal:</Text>
                    <Text fontWeight="bold">{formattedSubTotal}</Text>
                    </HStack>
                    <Button colorPalette="teal" size="md" onClick={handleCheckout}>Proceed to Checkout</Button>
                </VStack>
            </Card.Body>
        </Card.Root>
        </Flex>
        </Box>
    );
};

export default Cart;