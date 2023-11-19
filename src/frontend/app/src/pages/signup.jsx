import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    Spinner,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
const SignupCard = () => {
    const router = useRouter()
    const auth = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [userCredentials, setUserCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        isError: false,
        message: "",
        title: ""
    })
    const handleSignup = (event) => {
        event.preventDefault()
        if (
            userCredentials.firstName === '' ||
            userCredentials.lastName === '' ||
            userCredentials.email === '' ||
            userCredentials.password === ''
        ) {
            return alert('Please fill in all the fields')
        }
        else {
            setLoading(true)
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
                firstName: userCredentials.firstName,
                lastName: userCredentials.lastName,
                email: userCredentials.email,
                password: userCredentials.password,
            }).then(({ data }) => {
                auth.updateState({
                    authenticated: true,
                    user: data.user,
                    token: data.token
                })
                window.localStorage.setItem('auth_token', data.token)
                router.push('/')
            }).catch((err) => {
                auth.updateState({
                    authenticated: false,
                    user: null,
                    token: null
                })

                console.error(err)
            }).finally(() => {
                setLoading(false)

            })
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            {loading ? (<Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl' />) : (<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input value={userCredentials.firstName} onChange={(event) => {
                                            setUserCredentials((prev) => {
                                                return { ...prev, firstName: event.target.value }
                                            })
                                        }} type="text" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input value={userCredentials.lastName} onChange={(event) => {
                                            setUserCredentials((prev) => {
                                                return { ...prev, lastName: event.target.value }
                                            })
                                        }} type="text" />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input value={userCredentials.email} onChange={(event) => {
                                    setUserCredentials((prev) => {
                                        return { ...prev, email: event.target.value }
                                    })
                                }} type="email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        value={userCredentials.password} onChange={(event) => {
                                            setUserCredentials((prev) => {
                                                return { ...prev, password: event.target.value }
                                            })
                                        }}
                                        type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    onClick={(event) => { handleSignup(event) }}
                                    size="lg"
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link color={'blue.400'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>)}
        </Flex>
    )
}

export default SignupCard