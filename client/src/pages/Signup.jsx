import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Center,
    Card,
    Heading,
    Input,
    Stack,
    Button,
    createListCollection,
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

const stateOptions = createListCollection({
    items: [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' }
    ]
});

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAddress1Change = (e) => {
        setAddress1(e.target.value);
    };

    const handleAddress2Change = (e) => {
        setAddress2(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleZipcodeChange = (e) => {
        setZipcode(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // REPLACE WITH SIGNUP DETAILS HERE
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Address1:', address1);
        console.log('Address2:', address2);
        console.log('City:', city);
        console.log('State:', state);
        console.log('Zipcode:', zipcode);
        console.log('Password:', password);

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
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </Field>
                                <Field label="Email" required>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </Field>
                                <Field label="Address 1" required>
                                    <Input
                                        name="address1"
                                        type='text'
                                        value={address1}
                                        onChange={handleAddress1Change}
                                    />
                                </Field>
                                <Field label="Address 2 (Optional)">
                                    <Input
                                        name="address2"
                                        type='text'
                                        value={address2}
                                        onChange={handleAddress2Change}
                                    />
                                </Field>
                                <Field label="City" required>
                                    <Input
                                        name="city"
                                        type='text'
                                        value={city}
                                        onChange={handleCityChange}
                                    />
                                </Field>
                                <Field label="State" required>
                                    <SelectRoot
                                        onChange={handleStateChange}
                                        size="sm"
                                        collection={stateOptions}>
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
                                        value={zipcode}
                                        onChange={handleZipcodeChange}
                                    />
                                </Field>
                                <Field label="Password" required>
                                    <Input
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
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
