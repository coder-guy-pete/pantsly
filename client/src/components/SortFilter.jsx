import React, { useState } from 'react';
import { Stack, createListCollection } from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from './ui/select';

const sortOptions = createListCollection({
    items: [
        { value: 'name', label: 'Sort by Name' },
        { value: 'price-asc', label: 'Price (Low to High)' },
        { value: 'price-desc', label: 'Price (High to Low)' },
    ],
});

const SortFilter = ({ products, onSortChange }) => {
    const [sortOption, setSortOption] = useState('name'); // Default sort option

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        onSortChange(event.target.value); // Pass the selected option back up
    };

    return (
        <Stack spacing={4} direction="row">
            <SelectRoot onChange={handleSortChange} collection={sortOptions}>
                <SelectLabel>Sort By</SelectLabel> {/* Add a label */}
                <SelectTrigger>
                    <SelectValueText placeholder="Select" /> {/* Placeholder text */}
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.items.map((option) => (
                        <SelectItem item={option} key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </Stack>
    );
};

export default SortFilter;