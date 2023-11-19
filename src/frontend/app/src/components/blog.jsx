import React from 'react'
import { Box, Text, Flex, Avatar } from '@chakra-ui/react'
import Image from 'next/image'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';



const BlogView = () => {
    const newTheme = {
        p: props => {
            const { children } = props;
            return (
                <Text mb={2} fontSize={'12px'}>
                    {children}
                </Text>
            );
        },
    };
    return (
        <div>
            <Box mx="auto" mt={16} maxW={700} >
                <Text mx="auto" fontSize="5xl" fontWeight={700}  >Kubernetes - Introduction to Scalable Systems</Text>
                <Flex mb={8} mt={4} gap={4} flexDirection="row" >
                    <Avatar
                        size={'md'}
                        src={
                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                    />
                    <Flex flexDirection="column" >
                        <Text fontSize={"lg"} fontWeight={400}>Varun Koranne</Text>
                        <Text fontSize={"sm"} fontWeight={300}>Feb 08, 2021 · 6min read</Text>
                    </Flex>
                </Flex>
                <Box mb={8} rounded="">
                    <Image
                        width={700}
                        height={800}
                        src='/blog.avif'
                        alt="Example"
                    />
                </Box>
                <ReactMarkdown
                    components={ChakraUIRenderer(newTheme)}
                    children={`# Hello World \n  ## This is a test`}
                    skipHtml
                />
            </Box>

        </div>
    )
}
export default BlogView
