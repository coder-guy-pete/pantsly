import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
// Components
import { Flex } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
// Pages
import Shop from "./pages/Shop"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OrderHistory from "./pages/OrderHistory"
import Cart from "./pages/Cart"

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("shoppingCart")
    return storedCartItems ? JSON.parse(storedCartItems) : []
  });

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, size, color, quantity) => {
    setCartItems(prevItems => {
        const newItem = { ...product, size, color, quantity };
        const existingItemIndex = prevItems.findIndex(
          item => item.product_group_id === product.product_group_id && item.size === size && item.color === color
      );

      if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
      } else {
          return [...prevItems, newItem];
      }
  });
};

const handleRemoveFromCart = (product) => {
    setCartItems(prevItems => {
        const updatedItems = prevItems.filter((item) => item.product_group_id !== product.product_group_id);
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
        <Route path="/cart" element={ <Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="order-history" element={<OrderHistory />} />
      </Routes>
    </Flex>
  )
}

export default App