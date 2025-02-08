import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Card,
    Heading,
    VStack,
    Text,
    HStack,
    Image,
    Center,
    Spinner,
    Spacer,
    Highlight
} from '@chakra-ui/react';
// import Orders from '../mock-data/Orders'; // Import mock data
import { AuthContext } from '@/context/AuthContext';

const OrderHistory = () => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                return;
            }

            try {
                const response = await fetch(`/api/orders/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error);
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) {
        return (
            <Center h="100vh">
                <Text fontSize="xl">Please log in to view your order history</Text>
            </Center>
        );
    }

    if (loading) {
        return (
        <Center h="100vh"> {/* Center the spinner */}
            <Spinner size="lg" /> {/* Display a spinner while loading */}
        </Center>
        );
    }

    if (error) {
        return <Center h="100vh"><Text color="red.500">Error: {error.message}</Text></Center>
    }

    if (!orders || orders.length === 0) {
        return (
            <Center h="100vh">
                <Text fontSize="xl">No Previous Orders</Text>
            </Center>
        );
    }

    return (
        <Box p={4}>
            <Center>
                <VStack gap={5} w="50%">
                    <Heading as="h2" size="xl" textAlign="start" mb={4}>
                        Order History
                    </Heading>
                    {orders.map((order) => (
                        <Card.Root key={order.id} variant="outline" w="full" p={4}>
                        <Card.Header>
                        <HStack justify="space-between" mb={2}>
                        <Heading>Order # {order.id}</Heading>
                        <VStack align="end">
                        <Text fontSize="sm"><Highlight query="Purchased:" styles={{ color: 'teal.600' }}>Purchased:</Highlight> {order.purchase_date}</Text>
                        <Text fontSize="sm"><Highlight query="Fulfilled:" styles={{ color: 'teal.600' }}>Shipped:</Highlight> {order.fulfillment_date}</Text>
                        </VStack>
                        </HStack>
                        </Card.Header>
                        <Spacer mb={2} />
                        <Card.Body>
                        {order.items.map((item) => (
                        <HStack key={item.id} alignItems="center" gap="10" mb={2}>
                            <Image src={item.image_url} alt={item.name} boxSize="50px" />
                            <VStack align="start">
                            <Text fontWeight="bold">{item.name}</Text>
                            <Text>Qty: {item.quantity}</Text>
                            </VStack>
                        </HStack>
                        ))}
                        <HStack justify="flex-end">
                        <Text fontWeight="bold">Total: ${order.amount}</Text>
                        </HStack>
                        </Card.Body>
                    </Card.Root>
                    ))}
                </VStack>
            </Center>
        </Box>
    );
};

export default OrderHistory;