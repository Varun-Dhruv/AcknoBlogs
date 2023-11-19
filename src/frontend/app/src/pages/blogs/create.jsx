import React from 'react'
import {
    Box,
    Text,
} from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import BlogForm from '@/components/blogForm'
const CreateBlog = () => {
    return (
        <>
            <Navbar />
            <Box flex flexDirection={"column"} textAlign={"center"} mx={"auto"}>
                <Text mt={4} align="center" fontSize={"5xl"} color="green.400" fontWeight={700} mx="auto" >Write a Blog</Text>
                <BlogForm />
            </Box>
        </>
    )
}
export default CreateBlog
