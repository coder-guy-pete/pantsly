import React from "react"
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
  return (
    <Flex flexDir="column" gap="8">
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="order-history" element={<OrderHistory />} />
      </Routes>
    </Flex>
  )
}

export default App