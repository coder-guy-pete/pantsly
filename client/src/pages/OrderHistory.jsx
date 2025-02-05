import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    VStack,
    Text,
    HStack,
    Image,
    Center,
    Spinner,
    Spacer,
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
        <Heading as="h2" size="lg" mb={4}>
            Order History
        </Heading>
        <VStack spacing={4} align="stretch">
            {orders.map((order) => (
            <Box key={order.id} borderWidth="1px" borderRadius="md" p={4}>
                <HStack justify="space-between" mb={2}>
                <Text fontWeight="bold">Order # {order.number}</Text>
                <Text>Purchase Date: {order.purchase_date}</Text>
                </HStack>
                <Spacer mb={2} />
                {order.products.map((product) => (
                <HStack key={product.id} alignItems="center" mb={2}>
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
            </Box>
            ))}
        </VStack>
        </Box>
    );
};

export default OrderHistory;