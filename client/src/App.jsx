import React from "react"
import { Routes, Route } from "react-router-dom"
import Shop from "./pages/Shop"
import reactLogo from "@/assets/react.svg"
import { Center } from "@chakra-ui/react"

function App() {
  return (
    <Center flexDir="column" gap="8" minH="dvh">
      <Routes>
        <Route path="/" element={<Shop />} />
      </Routes>
    </Center>
  )
}

export default App