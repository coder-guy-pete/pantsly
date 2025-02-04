import React from "react"
import { Routes, Route } from "react-router-dom"
// Components
import { Flex } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
// Pages
import Shop from "./pages/Shop"
import Login from "./pages/Login"

function App() {
  return (
    <Flex flexDir="column" gap="8">
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Flex>
  )
}

export default App