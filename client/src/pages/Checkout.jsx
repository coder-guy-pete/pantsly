import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Heading, VStack, HStack, Button, Card, Text, Input } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { AuthContext } from './AuthContext';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const cartItems = location.state?.cartItems || [];
    const initialUserInfo = location.state?.userInfo || (user ? user : { name: '', email: '', phone: '', address1: '', address2: '', city: '', state: '', zip: '' });
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const [orderConfirmed, setOrderConfirmed] = useState(false);

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
        navigate('/order-confirmation'); // Navigate to confirmation page
    };

    return (
        <Box p={4}>
            <Heading as="h2" size="2xl" fontWeight="bold" mb={4}>Checkout</Heading>

            <Card p={4}>
                <Card.Header>
                    <Card.Title>Shipping Information</Card.Title>
                </Card.Header>
                <Card.Body>
                    <VStack spacing={4}>
                        <Field label="Name" required> {/* Use Field component */}
                            <Input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
                        </Field>
                        <Field label="Email" required>
                            <Input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
                        </Field>
                        <Field label="Phone" required>
                            <Input type="tel" name="phone" value={userInfo.phone} onChange={handleInputChange} />
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
                            <Input type="text" name="zip" value={userInfo.zip} onChange={handleInputChange} />
                        </Field>
                    </VStack>
                </Card.Body>
            </Card>

            <Card mt={4} p={4}>
                <Card.Header>
                    <Card.Title>Order Summary</Card.Title>
                </Card.Header>
                <Card.Body>
                    <VStack align="start" gap={2}>
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
                        <Text fontWeight="bold">Subtotal: {(cartItems.reduce((total, item) => total + item.price * item.quantity, 0)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
                        {orderConfirmed ? (
                            <Button colorScheme="teal" onClick={handleSubmit}>
                                Submit Order
                            </Button>
                            ) : (
                            <Button colorScheme="teal" onClick={handleConfirmOrder}>
                                Confirm Order
                            </Button>
                        )}
                    </VStack>
                </Card.Body>
            </Card>
        </Box>
    );
};

export default Checkout;