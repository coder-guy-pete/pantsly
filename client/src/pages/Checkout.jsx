import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, VStack, HStack, Button, Card, Text, Input } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoading: authLoading } = useContext(AuthContext);
    const [formValues, setFormValues] = useState({});
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

    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxes = subTotal * 0.0745;
    const total = subTotal + taxes;

    const formattedSubTotal = subTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const formattedTaxes = taxes.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = async () => {
        if (!user) {
            try {
            const response = await fetch(`api/users/${formValues.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json()
            const existingUser = data.has_account

            if (existingUser) {
                alert('User already exists. Please login to continue');
                navigate('/login');
            }

            setOrderConfirmed(true);

        } catch (error) {
            console.error(error);
            setError(error.message); 
        }} else {
            setOrderConfirmed(true);
        }
    };

    const handleSubmit = async () => {
        if (user) {
        try {
            const userData = {
                name: formValues.name,
                email: formValues.email,
                address1: formValues.address1,
                address2: formValues.address2,
                city: formValues.city,
                state: formValues.state,
                zipcode: formValues.zipcode,
            }
            const orderData = {
                orderItems: [...cartItems.map((item) => ({
                        product_group_id: item.product_group_id,
                        size: item.size,
                        color: item.color,
                        quantity: item.quantity,
                    })),
                ],
                user_id: user.id,
            };
            const responseUser = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!responseUser.ok) {
                throw new Error('Failed to update user');
            }

            const responseOrder = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!responseOrder.ok) {
                throw new Error('Failed to submit order');
            }

            alert('Order submitted successfully');
            navigate('/order-history');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    } else {
        try {
            const newUserData = {
                name: formValues.name,
                email: formValues.email,
                address1: formValues.address1,
                address2: formValues.address2,
                city: formValues.city,
                state: formValues.state,
                zipcode: formValues.zipcode,
                password: formValues.password,
            }
        
        const responseUser = await fetch(`/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData),
        });

        if (!responseUser.ok) {
            throw new Error('Failed to add user');
        }

        const orderData = {
            orderItems: [...cartItems.map((item) => ({
                    product_group_id: item.product_group_id,
                    size: item.size,
                    color: item.color,
                    quantity: item.quantity,
                })),
            ],
            user_id: responseUser.id,
        };

        const responseOrder = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        
        if (!responseOrder.ok) {
            throw new Error('Failed to submit order');
        }
    } catch (error) {
        console.error(error);
        setError(error.message);
    }}
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
                <form>
                <Card.Body>
                    <VStack spacing={4}>
                        <Field label="Name" required>
                            <Input type="text" name="name" value={formValues.name} onChange={handleInputChange} />
                        </Field>
                        <Field label="Email" required>
                            <Input type="email" name="email" value={formValues.email} onChange={handleInputChange} />
                        </Field>
                        <Field label="Address 1" required>
                            <Input type="text" name="address1" value={formValues.address1} onChange={handleInputChange} />
                        </Field>
                        <Field label="Address 2 (Optional)">
                            <Input type="text" name="address2" value={formValues.address2} onChange={handleInputChange} />
                        </Field>
                        <Field label="City" required>
                            <Input type="text" name="city" value={formValues.city} onChange={handleInputChange} />
                        </Field>
                        <Field label="State" required>
                            <Input type="text" name="state" value={formValues.state} onChange={handleInputChange} />
                        </Field>
                        <Field label="Zipcode" required>
                            <Input type="text" name="zipcode" value={formValues.zipcode} onChange={handleInputChange} />
                        </Field>
                        {!user ? (
                            <Field label="Password" helperText="Enter a password to create an account">
                                <Input type="password" name="password" value={formValues.password} onChange={handleInputChange} />
                            </Field>
                        ) : null}
                    </VStack>
                </Card.Body>
                </form>
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