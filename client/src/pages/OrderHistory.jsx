import React, { useState, useEffect } from 'react';
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
import Orders from '../mock-data/Orders'; // Import mock data

const OrderHistory = () => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    //   const [error, setError] = useState(null);

        // REPLACE THIS WITH ACTUAL FETCH FUNCTION
        useEffect(() => {
        const simulateOrderFetch = () => {
            setTimeout(() => {
                setOrders(Orders);
                setLoading(false);
            }, 1000);
        };

        simulateOrderFetch();
    }, []);

    if (loading) {
        return (
        <Center h="100vh"> {/* Center the spinner */}
            <Spinner size="lg" /> {/* Display a spinner while loading */}
        </Center>
        );
    }

    // if (error) {
    //     return <Center h="100vh"><Text color="red.500">Error: {error.message}</Text></Center>
    // }

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
                <VStack spacing={4} w="75%">
                    <Heading as="h2" size="xl" textAlign="start" mb={4}>
                        Order History
                    </Heading>
                    {orders.map((order) => (
                        <Card.Root key={order.id} variant="outline" w="full" p={4}>
                        <Card.Header>
                        <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold">Order # {order.number}</Text>
                        <VStack align="end">
                        <Text fontSize="sm"><Highlight query="Purchased:" styles={{ color: 'teal.600' }}>Purchased:</Highlight> {order.purchase_date}</Text>
                        <Text fontSize="sm"><Highlight query="Fulfilled:" styles={{ color: 'teal.600' }}>Fulfilled:</Highlight> {order.fulfillment_date}</Text>
                        </VStack>
                        </HStack>
                        </Card.Header>
                        <Spacer mb={2} />
                        <Card.Body>
                        {order.products.map((product) => (
                        <HStack key={product.id} alignItems="center" gap="10" mb={2}>
                            <Image src={product.image} alt={product.name} boxSize="50px" />
                            <VStack align="start">
                            <Text fontWeight="bold">{product.name}</Text>
                            <Text>Qty: {product.quantity}</Text>
                            </VStack>
                        </HStack>
                        ))}
                        <HStack justify="flex-end">
                        <Text fontWeight="bold">Total: ${order.purchase_amount}</Text>
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