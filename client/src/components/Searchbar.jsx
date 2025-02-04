import React, { useState } from 'react';
import { Flex, Input } from '@chakra-ui/react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value); // Call the onSearch callback
    };

    return (
        <Flex justify="center">
        <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange}
            mb={4}
            w="50%"
            _focus={{ 
                borderColor: 'teal.500',
                boxShadow: '0 0 0 1px teal.500',
            }}
        />
        </Flex>
    );
};

export default SearchBar;