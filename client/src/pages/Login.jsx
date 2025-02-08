import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext';
import { mockUsers } from '../mock-data/Users';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError(null);
        
        setTimeout(() => {
            const user = mockUsers.find(user => user.email === email && user.password === password);
            if (user) {
                login(user);
                navigate("/");
            } else {
                setLoginError("Invalid email or password.");
            }
            setIsLoading(false);
        }, 1000);
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
                    </form>
            </Card.Root>
        </Center>
);
};

export default Login;
