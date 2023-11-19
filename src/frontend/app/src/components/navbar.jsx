'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'


export default function Navbar() {
    const auth = useAuth()
    const router = useRouter()
    return (
        <>
            <Box minW={"full"} bg={useColorModeValue('gray.100', 'gray.900')} px={{ md: 10, base: 6 }} >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={{ md: 8 }} alignItems={'center'} >
                        <Box pointerEvents='visibleStroke' onClick={() => { window.location.pathname = "/" }}><Text fontWeight={800} fontSize={20} color={'green.400'}>AcknoBlogs</Text></Box>
                    </HStack>
                    {!auth.state.authenticated ? (
                        <Flex alignItems={'center'}>
                            <Button
                                variant={'outline'}
                                colorScheme={'green'}
                                // bg={'green.400'}
                                size={{ md: 'md', base: 'sm' }}
                                mr={4}
                                onClick={() => {
                                    router.push('/signin')
                                }
                                }>
                                Sign In
                            </Button>
                            <Button
                                variant={'solid'}
                                colorScheme={'green'}
                                size={{ md: 'md', base: 'sm' }}
                                onClick={() => {
                                    router.push('/signup')
                                }}>
                                Sign Up
                            </Button>
                        </Flex>) : (
                        <Flex alignItems={'center'}>
                            {window.location.pathname !== '/blogs/create' ? <Button
                                variant={'solid'}
                                colorScheme={'green'}
                                size={'sm'}
                                mr={4}
                                onClick={() => {
                                    router.push('/blogs/create')
                                }}
                                leftIcon={<AddIcon />}>
                                Create Blog
                            </Button> : null}
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        name={auth.state.user.firstName + auth.state.user.lastName}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => { console.log('profile') }}>Profile</MenuItem>
                                    <MenuItem onClick={() => { router.push('/profile/blogs') }}>My Blogs</MenuItem>
                                    <MenuItem onClick={() => { console.log('my blogs') }}>Saved Blogs</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => {
                                        window.localStorage.removeItem('auth_token')
                                        auth.updateState({
                                            authenticated: false,
                                            user: null,
                                            token: null
                                        })
                                    }}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>)}
                </Flex>
            </Box >
        </>
    )
}
