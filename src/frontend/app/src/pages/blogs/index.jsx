import BlogCard from '@/components/blogCard'
import Navbar from '@/components/navbar'
import React, { useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import SearchBar from '@/components/searchBar'
import { useRouter } from 'next/router'
import Pagination from '@/components/pagination'
const Blogs = () => {
  const router = useRouter()
  const handleSearch = () => {
    console.log("searching", searchTerm)
  }
  const [searchTerm, setSearchTerm] = useState('')
  const [currPage, setCurrPage] = React.useState(1)
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
          <Flex flexWrap="wrap" justify="space-between">
            <Box mx='auto' onClick={() => window.location.pathname = "/blogs/:id"}>
              < BlogCard editable={false} />
            </Box>
            <Box mx='auto' onClick={() => window.location.pathname = "/blogs/:id"}>
              < BlogCard editable={false} />
            </Box>
            <Box mx='auto' onClick={() => window.location.pathname = "/blogs/:id"}>
              < BlogCard editable={false} />
            </Box>
            {/* Add more BlogCard components as needed */}
          </Flex>
        </Box>
      </Flex>
      <Box my={12} mb={16} >
        <Pagination currentPage={currPage} totalPages={5} onPageChange={(num) => {
          setCurrPage(num)
        }} />
      </Box>
    </Box>
  )
}
export default Blogs
