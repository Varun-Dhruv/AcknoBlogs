import { useAuth } from '@/context/AuthContext'
import {
    Flex,
    Box,
    Alert,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Spinner,
    Stack,
    Button,
    Link,
    Heading,
    CloseButton,
    AlertDescription,
    AlertTitle,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AlertIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useRouter } from 'next/router'


const SignInCard = () => {
    const auth = useAuth()
    const router = useRouter()
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        isError: false,
        message: "",
        title: ""
    })
    const handleSignIn = (event) => {
        event.preventDefault()  
        if (userCredentials.email === '' || userCredentials.password === '') {
            return alert('Please fill in all the fields')
        }
        else {
            setLoading(true)
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signin`, {
                email: userCredentials.email,
                password: userCredentials.password,
            },{
                'Access-Control-Allow-Origin': '*',
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
                console.log(err.response)
                setError({ isError: true, message: err.response.data.message })
            }).finally(() => {
                setLoading(false)

            })
        }
        // setTimeout(() => {
        //     window.location.href = '/'
        // }, 5000)
    }
    return (
        <>
            {/* {error?.isError &&
                <Alert status='error' >
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            Your application has been received. We will review your application
                            and respond within the next 48 hours.
                        </AlertDescription>
                    </Box>
                    <CloseButton
                        alignSelf='flex-start'
                        position='relative'
                        right={-1}
                        top={-1}
                        onClick={() => { setError({ isError: false, message: "" }) }}
                    />
                </Alert >} */}
            < Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')} >
                {
                    loading ? <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' /> :
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                            <Stack align={'center'}>
                                <Heading fontSize={'4xl'} textAlign={'center'}>
                                    Sign In
                                </Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    to enjoy all of our cool features ✌️
                                </Text>
                            </Stack>
                            <Box
                                rounded={'lg'}
                                minW={'lg'}
                                alignSelf={'center'}
                                bg={useColorModeValue('white', 'gray.700')}
                                boxShadow={'lg'}
                                p={10}>
                                <Stack spacing={6}>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email address</FormLabel>
                                        <Input value={userCredentials.email} onChange={(event) => {
                                            setUserCredentials({ ...userCredentials, email: event.target.value })
                                        }} type="email" />
                                    </FormControl>
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <Input value={userCredentials.password} onChange={(event) => {
                                            setUserCredentials({ ...userCredentials, password: event.target.value })
                                        }} type="password" />
                                    </FormControl>
                                    <Stack spacing={10}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                            <Text color={'blue.400'}><Link href='/'>Forgot password?</Link></Text>
                                        </Stack>
                                        <Button
                                            bg={'green.400'}
                                            color={'white'}
                                            onClick={(event) => handleSignIn(event)}
                                            _hover={{
                                                bg: 'green.500',
                                            }}>
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                }
            </Flex >
        </>
    )
}

export default SignInCard