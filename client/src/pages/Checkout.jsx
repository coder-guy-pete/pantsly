import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, VStack, HStack, Button, Card, Text, Input } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoading: authLoading } = useContext(AuthContext);
    const [formValues, setFormValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    
    const cartItems = location.state?.cartItems || [];

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user) {
                return;
            }

            try {
                const token = localStorage.getItem('id_token');
                const response = await fetch(`/api/users/user/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setFormValues(userData);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [user]);

    console.log(formValues);

    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxes = subTotal * 0.0745;
    const total = subTotal + taxes;

    const formattedSubTotal = subTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const formattedTaxes = taxes.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = () => {
        setOrderConfirmed(true);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('id_token');

            const orderData = {
                items: cartItems,
                user: formValues,
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit order');
            }

            alert('Order submitted successfully');
            navigate('/order-history');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
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
                            <Input type="text" name="name" value={user.name} onChange={handleInputChange} />
                        </Field>
                        <Field label="Email" required>
                            <Input type="email" name="email" value={user.email} onChange={handleInputChange} />
                        </Field>
                        <Field label="Address 1" required>
                            <Input type="text" name="address1" value={user.address1} onChange={handleInputChange} />
                        </Field>
                        <Field label="Address 2 (Optional)">
                            <Input type="text" name="address2" value={user.address2} onChange={handleInputChange} />
                        </Field>
                        <Field label="City" required>
                            <Input type="text" name="city" value={user.city} onChange={handleInputChange} />
                        </Field>
                        <Field label="State" required>
                            <Input type="text" name="state" value={user.state} onChange={handleInputChange} />
                        </Field>
                        <Field label="Zip" required>
                            <Input type="text" name="zip" value={user.zipcode} onChange={handleInputChange} />
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