import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Flex, HStack, Button, Text, Spacer } from '@chakra-ui/react';
import { HiOutlineShoppingCart } from "react-icons/hi";

const Navbar = ({ cartItems }) => {
    const { user, logout } = useContext(AuthContext);
    const cartCount = cartItems.length;

    const isActive = (path) => window.location.pathname === path;

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
                {user ? (
                <Link to="/login">
                    <Button colorPalette="teal" rounded="lg">Login</Button>
                </Link>
                ) : (
                    <HStack gap={4}>
                        <Link to="/order-history">
                            <Button variant="surface" colorPalette="orange" rounded="lg">Order History</Button>
                        </Link>
                        <Button onClick={logout} colorPalette="red" rounded="lg">Logout</Button>
                    </HStack>
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