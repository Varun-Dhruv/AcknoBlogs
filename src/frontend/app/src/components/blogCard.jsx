
import Image from 'next/image'
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'


const BlogCard = ({ editable }) => {
    const router = useRouter();
    const handleDelete = () => {
    }

    return (
        <Center py={6}>
            <Box
                maxW={'390px'}
                w={'full'}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box h={'220px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                    <Image
                        src='/blog.avif'
                        fill
                        alt="Example"
                    />
                </Box>
                <Stack>
                    <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        Blog
                    </Text>
                    <Heading
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        Boost your conversion rate
                    </Heading>
                    <Text color={'gray.500'}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                    </Text>
                </Stack>
                {
                    editable ?
                        <Stack
                            mt={6}
                            direction={'row'}
                            spacing={4} align={'center'}
                        >
                            <Button
                                colorScheme='green'
                                onClick={(event) => { router.push("/blogs/update/:id") }}
                            >
                                Update
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={(event) => { console.log('updateBlog') }}
                            >
                                Delete
                            </Button>
                            <Button
                                colorScheme='blue'
                                onClick={(event) => { router.push("/blogs/:id") }}
                            >
                                View
                            </Button>


                        </Stack>
                        :
                        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                            <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text fontWeight={600}>Achim Rolle</Text>
                                <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                            </Stack>
                        </Stack>
                }
            </Box>
        </Center>
    )
}

export default BlogCard