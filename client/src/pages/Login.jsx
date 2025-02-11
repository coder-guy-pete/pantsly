import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Center,
    Card,
    Heading,
    Input,
    Stack,
    Button,
    Text,
    Alert,
} from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(response.json().message || 'Login failed');
            }

            const data = await response.json();
            const token = data.token;

            const success = await login(token);
            if (success) {
                navigate('/');
            } else {
                setError('Login failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Center>
            <Card.Root w="md">
                <form onSubmit={handleSubmit}>
                    <Card.Header>
                        <Heading size="xl" textAlign="center">Sign In</Heading>
                    </Card.Header>
                    <Card.Body p={6}>
                        <Stack>
                            <Field label="Email">
                                <Input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field label="Password">
                                <Input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                            </Field>
                            {error && (
                                <Alert.Root status="error">
                                    <Alert.Indicator />
                                    <Alert.Title>User not found</Alert.Title>
                                </Alert.Root>
                            )}
                        </Stack>
                    </Card.Body>
                    <Card.Footer>
                        <Button type="submit" colorPalette="teal" rounded="md" isLoading={isLoading}>
                            Log In
                        </Button>
                        <Text>Don't have an account?{' '}</Text>
                        <Text color="teal.500" textDecoration="underline"><Link to="/signup">Sign Up</Link></Text>
                    </Card.Footer>
                    </form>
            </Card.Root>
        </Center>
);
};

export default LoginPage;
