import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
// Components
import { Flex } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
// Pages
import Shop from "./pages/Shop"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OrderHistory from "./pages/OrderHistory"

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("shoppingCart")
    return storedCartItems ? JSON.parse(storedCartItems) : []
  });

  const handleAddToCart = (product, size, color, quantity) => {
    setCartItems(prevItems => {
        const newItem = { ...product, size, color, quantity };
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem('shoppingCart', JSON.stringify(updatedItems));
        return updatedItems;
    });
};

const handleRemoveFromCart = (product) => {
    setCartItems(prevItems => {
        const updatedItems = prevItems.filter((item) => item.product_group_id !== product.product_group_id);
        localStorage.setItem('shoppingCart', JSON.stringify(updatedItems));
        return updatedItems;
    });
};

const isProductInCart = (product) => cartItems.some(item => item.product_group_id === product.product_group_id);

  return (
    <Flex flexDir="column" gap="8">
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={
          <Shop
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            isProductInCart={isProductInCart}
            />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="order-history" element={<OrderHistory />} />
      </Routes>
    </Flex>
  )
}

export default App