import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>AcknoBlogs</title>
        <meta name="description" content="A blogs website for acknoledger" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <Navbar />
        <Hero />
      </main>
    </>
  )
}
