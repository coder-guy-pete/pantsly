import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Center,
    Card,
    Heading,
    Input,
    Stack,
    Button,
    Text,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { Field } from '../components/ui/field';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        e.preventDefault();
        // REPLACE WITH LOGIN DETAILS HERE
        setEmail(event.target.email.value);
        setPassword(event.target.password.value);
        console.log('Event:', event.target);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Center>
            <Card.Root w="md">
                <Card.Header>
                    <Heading size="xl" textAlign="center">Sign In</Heading>
                </Card.Header>
                <Card.Body p={6}>
                    <Stack as="form" onSubmit={handleSubmit}>
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
                    <Button type="submit" colorPalette="teal">
                        Log In
                    </Button>
                    <Text>Don't have an account?{' '}</Text>
                    <Text color="teal.500" textDecoration="underline"><Link to="/signup">Sign Up</Link></Text>
                </Card.Footer>
            </Card.Root>
        </Center>
);
};

export default Login;
