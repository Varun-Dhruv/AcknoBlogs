import Navbar from '@/components/navbar'
import React from 'react'
import { useRouter } from 'next/router'
import BlogView from '@/components/blog'

export const BlogPage = () => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <>
            <Navbar />
            <div>
                <BlogView />
            </div>
        </>
    )
}
export default BlogPage
