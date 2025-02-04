import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Center,
    Card,
    Heading,
    Input,
    Stack,
    Button,
} from '@chakra-ui/react';
import { Field } from '../components/ui/field';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // REPLACE WITH SIGNUP DETAILS HERE
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Center>
            <Card.Root as="form" w="md">
                <Card.Header>
                    <Heading size="xl" textAlign="center">Sign Up</Heading>
                </Card.Header>
                <Card.Body p={6}>
                    <Stack onSubmit={handleSubmit}>
                        <Field label="Name">
                            <Input
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </Field>
                        <Field label="Email">
                            <Input
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </Field>
                        <Field label="Password">
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                />
                        </Field>
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent="center">
                    <Button type="submit" colorPalette="teal" rounded="md">
                        Create User Account
                    </Button>
                </Card.Footer>
            </Card.Root>
        </Center>
);
};

export default Signup;
