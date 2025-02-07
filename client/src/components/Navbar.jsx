import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, HStack, Button, Text, Spacer } from '@chakra-ui/react';
import { HiOutlineShoppingCart } from "react-icons/hi";

const Navbar = ({ cartItems }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status (REPLACE THIS WITH ACTUAL AUTHENTICATION)
    const cartCount = cartItems.length;

    const isActive = (path) => location.pathname === path;

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <Flex as="nav" p={4}>

            <Spacer />

            <HStack spacing={4}>
                <Link to="/">
                    <Button variant="ghost" fontWeight={isActive("/") ? "bold" : "normal"}>Shop</Button>
                </Link>
                <Button variant="subtle" onClick={handleLogin}>Test Logged in</Button>
                {/* ADD OTHER NAVIGATION HERE */}
            </HStack>
        
            <Flex justify="flex-end" flex={1}>
            <HStack spacing={4}>
                {!isLoggedIn ? (
                <Link to="/login">
                    <Button colorPalette="cyan" rounded="lg">Login</Button>
                </Link>
                ) : (
                <Link to="/order-history">
                    <Button variant="surface" colorPalette="orange" rounded="lg">Order History</Button>
                </Link>
                )}
                <Link to="/cart">
                <Button variant="ghost">
                    <HiOutlineShoppingCart />{' '}
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