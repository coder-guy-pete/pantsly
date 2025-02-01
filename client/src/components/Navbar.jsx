import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, HStack, Button, Text, Spacer } from '@chakra-ui/react';
import { useState } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status (REPLACE THIS WITH ACTUAL AUTHENTICATION)
    const [cartCount, setCartCount] = useState(3); // State for cart count (REPLACE THIS WITH ACTUAL CART COUNT)

    const isActive = (path) => location.pathname === path;

    return (
        <Flex as="nav" p={4}>

            <Spacer />

            <HStack spacing={4}>
                <Link to="/">
                    <Button variant="ghost" fontWeight={isActive("/") ? "bold" : "normal"}>Shop</Button>
                </Link>
                {/* ADD OTHER NAVIGATION HERE */}
            </HStack>
        
            <Flex justify="flex-end" flex={1}>
            <HStack spacing={4}>
                {!isLoggedIn ? (
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                ) : (
                <Link to="/order-history">
                    <Button>Order History</Button>
                </Link>
                )}
                <Link to="/cart">
                <Button>
                    Cart{' '}
                    {cartCount > 0 && (
                    <Text 
                        as="span"
                        ml={1}
                        bg="teal.600"
                        color="white"
                        borderRadius="full"
                        px={2}
                        fontSize="sm"
                    >
                        {cartCount}
                    </Text>
                    )}
                </Button>
                </Link>
            </HStack>
            </Flex>
            </Flex>
        );
    };
    
    export default Navbar;