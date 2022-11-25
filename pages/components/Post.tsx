import React  from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon , ChatBubbleOvalLeft, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
 import { ChatBubbleLeftIcon , GiftIcon , ShareIcon ,  BookmarkIcon } from '@heroicons/react/24/solid';     
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link"
import { Jelly } from '@uiball/loaders'
import  toast  from "react-hot-toast";
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { GetVotingsbypost } from "../../graphql/queries";
import { useMutation } from '@apollo/client';

import { addvote } from './../../graphql/mutations';
type Props = {
  post: Post;
};


function Post({ post }: Props) {

  const [vote, setVote] = useState<boolean>()
const {data: session} = useSession()

const {data,loading} = useQuery(GetVotingsbypost,{
  variables: {
    post_id: post?.id
  }
})



const [addVote] = useMutation(addvote, {
  refetchQueries: [GetVotingsbypost,'getVoteListbypost']
})


const upVote = async (isUpvote: boolean) => {
  if(!session){
    toast("U Need To Sign In to Vote!")
    return
  }
  if(vote && isUpvote) return;
  if(vote === false && !isUpvote) return;
  console.log('voting...', isUpvote)

 const {
data: {insertVote:newVote}
 }=  await addVote({
    variables: {
      post_id: post.id,
      username: session.user?.name,
      upvote: isUpvote
    }
  })
  
}



useEffect(() => {
const votes: Vote[] = data?.getVoteListbypost
const vote = votes?.find(vote => vote.username == session?.user?.name)?.upvote
setVote(vote)

}, [data])


const displayVotes = (data: any) => {

  const votes: Vote[] = data?.getVoteListbypost
  console.log('votes',votes)
  const num = votes?.reduce((total,vote)=> (vote?.upvote? (total++) : (total--)),0)

  if (votes?.length === 0) return 0

  if(num === 0 ) {
    return votes[0]?.upvote ? 1 : -1
  }
console.log('v',num)

  return num;
}


  if(!post) return (
    <div className="flex w-full items-center justify-center p-10 text-xl">
       <Jelly size={50} color="#FF4501"/>
    </div>
  )
  
  return (
    <Link href={`/post/${post.id}`}>
    <div className="flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border-gray-600">
      <div className="flex flex-col items-center justify-center space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon onClick={()=> upVote(true)} className={`voteButtons hover:text-red-400 ${vote && 'text-red-400'}`} />
        <p className="text-black font-bold text-black">{ displayVotes(data)}</p>
        <ArrowDownIcon onClick={()=> upVote(false)} className={`voteButtons hover:text-blue-400 ${vote === false && 'text-blue-400'}`} />
      </div>

      <div className="p-3 pb-1">
        {/*  Header  */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreddit[0]?.topic} />
          <p className="text-xs text-gray-400">
            <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
            <span className="font-bold text-black hover:text-blue-400 hover:underline">
              r/{post.subreddit[0]?.topic}{" "}
            </span>
</Link>
            * Posted by u/{post.username} <TimeAgo date={post.created_at} />
          </p>
        </div>

        {/*  Body  */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p classname="mt-2 text-sm font-light">{post.body}</p>
        </div>
        {/*  Image  */}
        <img className="w-full" src={post.image} alt="" />

         {/*  footer  */}
        <div className='flex space-x-4 text-gray-400'>
            <div className='postButtons flex'>
            <ChatBubbleLeftIcon className='h-5 w-5'/>
                <p className="">{post.comments.length} Comments</p>
            </div>
            <div className='postButtons flex'>
            <GiftIcon className='h-5 w-5'/>
                <p className="hidden sm:inline"> Award</p>
            </div>
            <div className='postButtons flex'>
            <ShareIcon className='h-5 w-5'/>
                <p className="hidden sm:inline"> Share</p>
            </div>
           
            <div className='postButtons flex'>
            <BookmarkIcon className='h-5 w-5'/>
                <p className="hidden sm:inline"> Save</p>
            </div>

            <div className='postButtons flex'>
            <EllipsisHorizontalIcon className='h-5 w-5'/>
            </div>
        </div>

      </div>
    </div>
    </Link>
  );
}

export default Post;
