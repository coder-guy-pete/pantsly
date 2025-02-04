import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Center,
    Card,
    Heading,
    Input,
    Stack,
    Button,
    Text
} from '@chakra-ui/react';
import { Field } from '../components/ui/field';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // REPLACE WITH LOGIN DETAILS HERE
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Center>
            <Card.Root w="md">
                <Card.Header>
                    <Heading size="xl" textAlign="center">Sign Up</Heading>
                </Card.Header>
                <Card.Body p={6}>
                    <Stack as="form" onSubmit={handleSubmit}>
                        <Field label="Name">
                            <Input
                                name="name"
                                type="text"
                                required
                            />
                        </Field>
                        <Field label="Email">
                            <Input
                                name="email"
                                type="email"
                                required
                            />
                        </Field>
                        <Field label="Password">
                            <Input
                                name="password"
                                type="password"
                                required
                                />
                        </Field>
                    </Stack>
                </Card.Body>
                <Card.Footer>
                    <Button type="submit" colorPalette="teal" rounded="md" onClick={handleSubmit}>
                        Create User Account
                    </Button>
                </Card.Footer>
            </Card.Root>
        </Center>
);
};

export default Signup;
