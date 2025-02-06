import React, { createContext, useState } from 'react';

export const CartContext = createContext({
    cartItems: [],
    setCartItems: () => {},
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};