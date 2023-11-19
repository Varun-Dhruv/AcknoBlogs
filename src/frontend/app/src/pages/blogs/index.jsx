import BlogCard from '@/components/blogCard'
import Navbar from '@/components/navbar'
import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, Spinner } from '@chakra-ui/react'
import SearchBar from '@/components/searchBar'
import { useRouter } from 'next/router'
import Pagination from '@/components/pagination'
import axios from "axios"
import { dateConverter } from "@/utils/date"
const Blogs = () => {
  const router = useRouter()
  const handleSearch = () => {
    console.log("searching", searchTerm)
  }
  const [searchTerm, setSearchTerm] = useState('')
  const [currPage, setCurrPage] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [blogs, setBlogs] = React.useState([])


  useEffect(() => {
    setLoading(true)
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?pageNo=${currPage}`).then(({ data }) => {
      setBlogs(data)
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    })
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
        <Text align="center" fontSize={"5xl"} color="green.400" fontWeight={700} mx="auto" >Latest Blogs</Text>
      </Flex>
      <Flex mt={12} justify="center" align="center">
        <Box maxW="1400px" w="100%" px={4}>
          {
            loading ? <Box w="max-content" mx={"auto"}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl' />
            </Box> :
              <Flex flexWrap="wrap" justify="space-between">
                {blogs.map((blog, key) => {
                  return (
                    <>
                      < BlogCard editable={false}
                        key={key}
                        id={blog._id}
                        title={blog.title}
                        description={blog.description}
                        image={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/${blog.image}`}
                        author={blog.author.firstName + " " + blog.author.lastName}
                        publish_date={dateConverter(blog.createdAt)} />
                    </>
                  )
                })}
              </Flex >
          }
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
export default Blogs
