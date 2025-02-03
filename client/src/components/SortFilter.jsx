import React, { useState, useMemo, useCallback } from 'react';
import { Collapsible, Card, Button, Stack, createListCollection, CheckboxGroup, Fieldset, CollapsibleContent} from '@chakra-ui/react';
import { Checkbox } from './ui/checkbox';
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
        { value: 'name-asc', label: 'Sort by Name (A to Z)' },
        { value: 'name-desc', label: 'Sort by Name (Z to A)' },
        { value: 'price-asc', label: 'Price (Low to High)' },
        { value: 'price-desc', label: 'Price (High to Low)' },
    ],
});


const SortFilter = ({ products, onSortChange, onBrandFilterChange }) => {
    const [sortOption, setSortOption] = useState('name-asc');
    const [selectedBrands, setSelectedBrands] = useState([]);
    
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        onSortChange(event.target.value);
    };

    const handleBrandFilterChange = useCallback((event) => {
        const brand = event.target.value;
        const isChecked = event.target.checked;

        setSelectedBrands(prevBrands => {
            const updatedBrands = isChecked
                ? [...prevBrands, brand]
                : prevBrands.filter(b => b !== brand);

            onBrandFilterChange(updatedBrands);
            return updatedBrands;
        });
    }, [onBrandFilterChange, selectedBrands]);

    const brandOptions = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

    return (
        <Collapsible.Root position="sticky" top="80px">
        <Collapsible.Trigger>
            <Button variant="surface" mb={2}>Sort/Filter</Button>
        </Collapsible.Trigger>
        <CollapsibleContent>
        <Card.Root p={4} variant="subtle" w="300px">
            <Card.Header />
            <Stack spacing={4}>
                <SelectRoot onChange={handleSortChange} collection={sortOptions} w="200px" mb={4}>
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

                <Fieldset.Root onChange={handleBrandFilterChange}>
                    <CheckboxGroup name="brand-filters" onChange={handleBrandFilterChange}>
                        <Fieldset.Legend fontSize="sm" mb="2">Brands</Fieldset.Legend>
                        <Fieldset.Content> 
                            {brandOptions.map((brand) => (
                                <Checkbox key={brand} value={brand}>
                                    {brand}
                                </Checkbox>
                            ))}
                        </Fieldset.Content>
                    </CheckboxGroup>
                </Fieldset.Root>
            </Stack>
        </Card.Root>
        </CollapsibleContent>
        </Collapsible.Root>
    );
};

export default SortFilter;