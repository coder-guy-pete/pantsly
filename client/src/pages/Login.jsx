import React, { useState } from 'react';
import {
    Center,
    Card,
    Heading,
    Fieldset,
    Input,
    Stack,
    Button,
    Text,
    Link,
} from '@chakra-ui/react';
import { Field } from '../components/ui/field';

const Login = () => {
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
            <Card.Body p={6}>
                <form onSubmit={handleSubmit}>
                    <Fieldset.Root>
                        <Stack>
                            <Heading size="xl" textAlign="center">Sign In</Heading>
                        </Stack>
                            <Fieldset.Content>
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
                            </Fieldset.Content>
                            <Button type="submit" colorScheme="teal" width="full">
                                Log In
                            </Button>
                                <Text>
                                    Don't have an account?{' '}
                                    <Link color="teal.500" href="/signup">
                                        Sign Up
                                    </Link>
                                </Text>
                    </Fieldset.Root>
                </form>
            </Card.Body>
        </Card.Root>
        </Center>
);
};

export default Login;
