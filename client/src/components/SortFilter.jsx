import React, { useState, useMemo, useCallback } from 'react';
import { Stack, createListCollection, CheckboxGroup, Fieldset, Button, Center} from '@chakra-ui/react';
import { Checkbox } from './ui/checkbox';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from './ui/select';
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { GiHamburgerMenu } from "react-icons/gi";

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
    const [isOpen, setIsOpen] = useState(false);
    
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
        <DrawerRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="left" size="xs">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button onClick={() => setIsOpen(true)} variant="surface"><GiHamburgerMenu /></Button>
            </DrawerTrigger>
            <DrawerContent offset="2" rounded="md">
                <DrawerCloseTrigger />
                <DrawerHeader>
                <DrawerTitle />
                </DrawerHeader>
                        <Stack spacing={4} ml={5}>
                            <SelectRoot 
                                onChange={handleSortChange} 
                                collection={sortOptions}
                                w="200px" 
                                mb={4}
                                >
                                <SelectLabel>Sort By</SelectLabel>
                                <SelectTrigger>
                                    <SelectValueText placeholder="Select" />
                                </SelectTrigger>
                                    <SelectContent portalled={false}>
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
                <DrawerFooter />
            </DrawerContent>
        </DrawerRoot>
    );
};

export default SortFilter;