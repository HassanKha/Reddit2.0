import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import  Header  from './components/Header'
import Postbox from './components/Postbox';
import Feed from './components/Feed';
const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>ReDDit 2.0 clone</title>
      </Head>

      <Postbox/>

      <div className='flex'>
        <Feed/>
      </div>
    </div>
  )
}

export default Home
