import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import  Header  from './components/Header'
import Postbox from './components/Postbox';
import Feed from './components/Feed';
import { useQuery } from '@apollo/client';
import { GetSubredditListLimit } from '../graphql/queries';
import SubredditRow from './components/SubredditRow';

const Home: NextPage = () => {
const {data} = useQuery(GetSubredditListLimit,{
  variables:{
    limit:10
  }
})

const subreddits: Subreddit[] = data?.getSubredditListLimit
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>ReDDit 2.0 clone</title>
      </Head>

      <Postbox/>

      <div className='flex'>
        <Feed/>
        <div className='sticky top-36 mx-5 hidden h-fit min-w-[300px]
        rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>
          <div>
{subreddits?.map((subreddit,i) =>( 
  <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
