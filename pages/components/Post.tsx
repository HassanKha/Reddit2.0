import React from "react";
import { ArrowUpIcon, ArrowDownIcon , ChatBubbleOvalLeft, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
 import { ChatBubbleLeftIcon , GiftIcon , ShareIcon ,  BookmarkIcon } from '@heroicons/react/24/solid';     
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link"
type Props = {
  post: Post;
};


function Post({ post }: Props) {
   
  return (
    <Link href={`/post/${post.id}`}>
    <div className="flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border-gray-600">
      <div className="flex flex-col items-center justify-center space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-black font-bold text-black">0</p>
        <ArrowDownIcon className="voteButtons hover:text-blue-400" />
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
