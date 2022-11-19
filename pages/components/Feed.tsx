import React from 'react'
import {useQuery} from '@apollo/client';
import { GetAllPosts,GetPostListbytopic } from './../../graphql/queries';
import Post from './Post';

interface Props {
  topic?: string
}

function Feed({topic} : Props) {

  //console.log("h",topic);
    const {data,error} = !topic ? useQuery(GetAllPosts) : useQuery(GetPostListbytopic, {
      variables:{
        topic:topic,
      },
    })
    //console.log('d', data);
    const posts: Post[] = !topic? data?.getPostList : data?.getPostListbytopic
    //console.log('d', posts);
    
  return (
    <div className="mt-5 space-y-4">{
        posts?.map((post) => (
<Post key={post.id} post={post} />
        ))}
    </div>
  )
}

export default Feed