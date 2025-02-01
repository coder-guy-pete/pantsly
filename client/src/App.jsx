import React from "react"
import { Routes, Route } from "react-router-dom"
// Components
import { Flex } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
// Pages
import Shop from "./pages/Shop"

function App() {
  return (
    <Flex flexDir="column" gap="8">
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
      </Routes>
    </Flex>
  )
}

export default App