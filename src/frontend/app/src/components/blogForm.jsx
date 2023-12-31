import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import FormData from 'form-data'
import axios from "axios"
import { useRouter } from 'next/router';
const BlogForm = ({ title, slug, image, description, content }) => {
    const [formData, setFormData] = useState({
        title: title,
        slug: slug,
        image: image,
        description: description,
        content: content,
    });
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        // console.log(formData)
        data.append('title', formData.title);
        data.append('slug', formData.slug);
        data.append('description', formData.description);
        data.append('image', formData.image);
        data.append('content', formData.content);
        console.log(formData);
        const token = window.localStorage.getItem('auth_token')

        const headers = {
            'Authorization': token
        };
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`, data, { headers })
            .then(({ data }) => {
                console.log(data)
            }).catch((error) => {
                console.error(error)
            }).finally(() => {
                router.push("/blogs")
            })
    }

    return (
        <Box mt={8} mb={16} mx={"auto"} maxWidth={{ md: 900, base: 600 }} p={4} borderWidth="1px" borderRadius="lg">
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Blog Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Blog Slug</FormLabel>
                        <Input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="Enter blog slug"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Blog Image</FormLabel>
                        <Input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Blog Description</FormLabel>
                        {/* <SimpleMdeReact
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Enter blog content" />; */}
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}

                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Blog Content</FormLabel>
                        <Textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}

                        />
                    </FormControl>

                    <Button type="submit" colorScheme="green">
                        Publish
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default BlogForm;
