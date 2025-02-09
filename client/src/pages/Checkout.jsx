import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, VStack, HStack, Button, Card, Text, Input } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const cartItems = location.state?.cartItems || [];
    const initialUserInfo = location.state?.userInfo || (user ? user : { name: '', email: '', address1: '', address2: '', city: '', state: '', zipcode: '' });
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxes = subTotal * 0.0745;
    const total = subTotal + taxes;

    const formattedSubTotal = subTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const formattedTaxes = taxes.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = () => {
        setOrderConfirmed(true);
    };

    const handleSubmit = () => {
        // Placeholder for submitting the order (backend integration)
        console.log("Order submitted:", { cartItems, userInfo });
        alert("Order submitted successfully! (Placeholder)");
        navigate('/order-history'); // Navigate to confirmation page
    };

    return (
        <Box p={4}>
            <VStack spacing={4}>
            <Heading as="h2" size="2xl" fontWeight="bold" mb={4}>Checkout</Heading>
            <Flex gap={10} justify="center">
            <Card.Root p={4} w="md">
                <Card.Header>
                    <Card.Title>Shipping Information</Card.Title>
                </Card.Header>
                <Card.Body>
                    <VStack spacing={4}>
                        <Field label="Name" required>
                            <Input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
                        </Field>
                        <Field label="Email" required>
                            <Input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
                        </Field>
                        <Field label="Address 1" required>
                            <Input type="text" name="address1" value={userInfo.address1} onChange={handleInputChange} />
                        </Field>
                        <Field label="Address 2 (Optional)">
                            <Input type="text" name="address2" value={userInfo.address2} onChange={handleInputChange} />
                        </Field>
                        <Field label="City" required>
                            <Input type="text" name="city" value={userInfo.city} onChange={handleInputChange} />
                        </Field>
                        <Field label="State" required>
                            <Input type="text" name="state" value={userInfo.state} onChange={handleInputChange} />
                        </Field>
                        <Field label="Zip" required>
                            <Input type="text" name="zip" value={userInfo.zipcode} onChange={handleInputChange} />
                        </Field>
                    </VStack>
                </Card.Body>
            </Card.Root>

            <Card.Root p={4}>
                <Card.Header>
                    <Card.Title>Order Summary</Card.Title>
                </Card.Header>
                <Card.Body>
                    <VStack align="end" gap={2}>
                        {cartItems.map((item) => (
                            <HStack key={`${item.product_group_id}-${item.size}-${item.color}`}>
                                <Text>{item.name} x {item.quantity}</Text>
                                <Text fontWeight="bold">
                                {(item.price * item.quantity).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                                </Text>
                            </HStack>
                        ))}
                        <Text mt={5}>{`--------------`}</Text>
                        <HStack>
                            <Text>Subtotal:</Text>
                            <Text fontWeight="bold">{formattedSubTotal}</Text>
                        </HStack>
                        <HStack>
                            <Text>Taxes:</Text>
                            <Text fontWeight="bold">{formattedTaxes}</Text>
                        </HStack>
                        <HStack>
                            <Text>Total:</Text>
                            <Text fontWeight="bold">{formattedTotal}</Text>
                        </HStack>
                        {orderConfirmed ? (
                            <Button colorPalette="teal" onClick={handleSubmit}>
                                Submit Order
                            </Button>
                            ) : (
                            <Button variant="surface" colorPalette="teal" onClick={handleConfirmOrder}>
                                Confirm Order
                            </Button>
                        )}
                    </VStack>
                </Card.Body>
            </Card.Root>
            </Flex>
            </VStack>
        </Box>
    );
};

export default Checkout;