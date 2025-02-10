import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Center,
    Card,
    Heading,
    Input,
    Stack,
    Button,
} from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { Toaster, toaster } from '../components/ui/toaster';
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from '../components/ui/select';
import stateOptions from '../logic/States';

const Signup = () => {
    const [formValues, setFormValues] = useState({});
    const [stateValue, setStateValue] = useState(['']);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleStateChange = (e) => {
        setFormValues({ ...formValues, state: e.value });
        console.log('State:', e.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // REPLACE WITH SIGNUP DETAILS HERE
        console.log('Form Values:', formValues);

    // REPLACE WITH SIGNUP DETAILS HERE. USE PROMISE TO SIMULATE ASYNC REQUEST

        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(), 3000)
        });

        toaster.promise(promise, {
            success: {
                title: "User Account Created",
                description: "You have successfully created a user account.",
            },
            error: {
                title: "User Account Creation Failed",
                description: "There was an error creating your account. Please try again.",
            },
            loading: { title: "Creating User Account", description: "Please wait while we create your account." },
        })

        // USE a FINALLY to navigate to the home page after a successful signup
    };

    return (
        <Center>
            <Card.Root w="md">
                <form onSubmit={handleSubmit}>
                    <Card.Header>
                        <Heading size="xl" textAlign="center">Sign Up</Heading>
                    </Card.Header>
                    <Card.Body p={6}>
                            <Stack gap={5}>
                                <Field label="Name" required>
                                    <Input
                                        name="name"
                                        type="text"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />
                                </Field>
                                <Field label="Email" required>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                </Field>
                                <Field label="Address 1" required>
                                    <Input
                                        name="address1"
                                        type='text'
                                        value={formValues.address1}
                                        onChange={handleInputChange}
                                    />
                                </Field>
                                <Field label="Address 2 (Optional)">
                                    <Input
                                        name="address2"
                                        type='text'
                                        value={formValues.address2}
                                        onChange={handleInputChange}
                                    />
                                </Field>
                                <Field label="City" required>
                                    <Input
                                        name="city"
                                        type='text'
                                        value={formValues.city}
                                        onChange={handleInputChange}
                                    />
                                </Field>
                                <Field label="State" required>
                                    <SelectRoot
                                        size="sm"
                                        collection={stateOptions}
                                        value={formValues.state}
                                        onValueChange={handleStateChange}>
                                        <SelectTrigger>
                                            <SelectValueText />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {stateOptions.items.map((state) => (
                                                <SelectItem item={state} key={state.value}>
                                                    {state.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectRoot>
                                </Field>
                                <Field label="Zipcode" required>
                                    <Input
                                        name="zipcode"
                                        type='text'
                                        value={formValues.zipcode}
                                        onChange={handleInputChange}
                                    />
                                </Field>
                                <Field label="Password" required>
                                    <Input
                                        name="password"
                                        type="password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        />
                                </Field>
                            </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="center">
                            <Button type="submit" colorPalette="teal" rounded="md">
                                Create User Account
                            </Button>
                    </Card.Footer>
                </form>
            </Card.Root>
            <Toaster />
        </Center>
);
};

export default Signup;
