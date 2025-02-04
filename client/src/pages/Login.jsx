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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // REPLACE WITH LOGIN DETAILS HERE
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Center>
            <Card.Root as="form" w="md">
                <Card.Header>
                    <Heading size="xl" textAlign="center">Sign In</Heading>
                </Card.Header>
                <Card.Body p={6}>
                    <Stack onSubmit={handleSubmit}>
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
                <Card.Footer>
                    <Button type="submit" colorPalette="teal" rounded="md">
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
