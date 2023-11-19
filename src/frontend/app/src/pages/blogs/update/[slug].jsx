import React, { useEffect, useState } from 'react'
import {
    Box,
    Text,
} from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import BlogForm from '@/components/blogForm'
import { useRouter } from 'next/router'
import axios from "axios"
const UpdateBlog = () => {
    const router = useRouter()
    const [blogData, setBlogData] = useState({})
    useEffect(() => {
        const id = router.query.slug
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${id}`).then(({ data }) => {
            console.log(data)
            setBlogData(data);
        }).catch((error) => {
            console.error(error)
        })
    }, [])
    return (
        <>
            <Navbar />
            <Box flex flexDirection={"column"} textAlign={"center"} mx={"auto"}>
                <Text mt={4} align="center" fontSize={"5xl"} color="green.400" fontWeight={700} mx="auto" >Update Blog</Text>
                <BlogForm
                    id={blogData?._id}
                    title={blogData?.title}
                    slug={blogData?.slug}
                    image={blogData?.image}
                    description={blogData?.description}
                    content={blogData?.content} />
            </Box>
        </>
    )
}
export default UpdateBlog
