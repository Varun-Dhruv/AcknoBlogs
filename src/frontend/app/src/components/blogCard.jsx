
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
import axios from "axios"


const BlogCard = ({ id, editable, title, description, image, author, publish_date }) => {
    const router = useRouter();
    const handleDelete = (id) => {
        const token = window.localStorage.getItem('auth_token')
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${id}`,
            headers: {
                'Authorization': token
            }
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
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
                        src={image}
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
                        {title}
                    </Heading>
                    <Text color={'gray.500'}>
                        {description}
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
                                onClick={(event) => { router.push(`/blogs/update/${id}`) }}
                            >
                                Update
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={(event) => {
                                    event.preventDefault()
                                    handleDelete(id)
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                colorScheme='blue'
                                onClick={(event) => {
                                    router.push(`/blogs/${id}`)
                                }}
                            >
                                View
                            </Button>


                        </Stack>
                        :
                        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                            <Avatar name={author} />
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text fontWeight={600}>{author}</Text>
                                <Text color={'gray.500'}>{publish_date} · 6min read</Text>
                            </Stack>
                        </Stack>
                }
            </Box>
        </Center >
    )
}

export default BlogCard