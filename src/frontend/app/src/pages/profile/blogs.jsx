import BlogCard from '@/components/blogCard'
import Navbar from '@/components/navbar'
import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import SearchBar from '@/components/searchBar'
import { useRouter } from 'next/router'
import Pagination from '@/components/pagination'
import axios from "axios"
import { useAuth } from '@/context/AuthContext'
import { dateConverter } from '@/utils/date'
const MyBlogs = () => {
    const router = useRouter()
    const auth = useAuth()
    const handleSearch = () => {
        console.log("searching", searchTerm)
    }
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currPage, setCurrPage] = React.useState(1)
    useEffect(() => {
        console.log(auth.state.user)
        if (auth.state?.user?._id) {
            setLoading(true)
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/author?id=${auth.state?.user?._id.toString()}&page=${currPage}`).then(({ data }) => {
                console.log(data.blogs)
                setBlogs(data.blogs)
            }).catch(err => {
                console.error(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [currPage])
    return (
        <Box maxWidth="100vw" w="full">
            <Navbar />
            <Flex gap={12} alignItems="center" mx="auto" direction="column" w="full" mt={20}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={(value) => {
                    return setSearchTerm(value)
                }} handleSearch={() => {
                    handleSearch()
                }}
                />
                <Text align="center" fontSize={"5xl"} color="green.400" fontWeight={700} mx="auto" >My Blogs</Text>
            </Flex>
            <Flex mt={12} justify="center" align="center">
                <Box maxW="1400px" w="100%" px={4}>
                    <Flex flexWrap="wrap" justify="space-between">
                        {
                            blogs?.map((blog, key) => {
                                return (
                                    <>
                                        < BlogCard editable={true}
                                            key={key}
                                            id={blog._id}
                                            title={blog.title}
                                            description={blog.description}
                                            image={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/${blog.image}`}
                                            author={blog.author.firstName + " " + blog.author.lastName}
                                            publish_date={dateConverter(blog.createdAt)} />
                                    </>
                                )
                            })
                        }
                        {/* <Box mx='auto' >
                            < BlogCard editable={true} />
                        </Box>
                        <Box mx='auto' >
                            < BlogCard editable={true} />
                        </Box>
                        <Box mx='auto' >
                            < BlogCard editable={true} />
                        </Box> */}
                        {/* Add more BlogCard components as needed */}
                    </Flex>
                </Box>
            </Flex>
            <Box my={12} mb={16} >
                <Pagination currentPage={currPage} totalPages={1} onPageChange={(num) => {
                    setCurrPage(num)
                }} />
            </Box>
        </Box>
    )
}
export default MyBlogs;

