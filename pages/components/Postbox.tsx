import React , {useState} from 'react'
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client';
import { addpost , addsubreddit} from './../../graphql/mutations';
import client from './../../apolo_client';
import { GetSubredditListbytopic , GetAllPosts } from './../../graphql/queries';

import toast, { Toaster } from 'react-hot-toast';
interface FormData  {
postTitle: string
postBody: string
postImage: string
subreddit: string
}

interface Props  {
  subreddit?: string
}


function Postbox({subreddit}: Props) {
    const {data: session } = useSession();
    const [addPost] = useMutation(addpost, {
      refetchQueries: [
      GetAllPosts,'getPostList'
    ]});
    const [addSubreddit] = useMutation(addsubreddit);

const [ImageBoxOpen , setImageBoxOpen] = useState<boolean>(false)
const {
  register,
  setValue,
  handleSubmit,
  watch,
  formState: {errors},
} = useForm<FormData>()

const onSubmit = handleSubmit(async (formData) => {
console.log(formData)
const notification = toast.loading('Creating new post...')
try {
  const {data: {getSubredditListbytopic}}= await client.query({
    query: GetSubredditListbytopic,
    variables: {
      topic: subreddit || formData.subreddit
    }
  })
  console.log(getSubredditListbytopic)
const subredditexists = getSubredditListbytopic.length >0;
if(!subredditexists){
console.log("new");
    
    const {data: {insertSubreddit : newsub}} = await addSubreddit({
      variables : {
        topic: formData.subreddit
      }
    })

    const image = formData.postImage || ''

const {data: {insertPost: newPost} } = await addPost ({
  variables: {
    body: formData.postBody,
    image: image,
    subreddit_id: newsub.id,
    title: formData.postTitle,
    username: session?.user?.name,

  }
})

console.log(newPost);

}
else {
  const image = formData.postImage || ''
  const {data: {insertPost: newPost} } = await addPost ({
    variables: {
      body: formData.postBody,
      image: image,
      subreddit_id: getSubredditListbytopic[0].id,
      title: formData.postTitle,
      username: session?.user?.name,
  
    }
  })
}
setValue('postBody','')
setValue('postImage','')
setValue('postTitle','')
setValue('subreddit','')
toast.success('Successfully toasted!', {
  id: notification
})
} catch (error) {
  toast.error("error")
}
})
  return (
    <form onSubmit={onSubmit} className='p-2 sticky top-20 z-50 rounded-md bg-white border-gray-300'>
<div className='flex items-center space-x-3'>
   <Avatar />
    <input {...register('postTitle', {required: true})}  className='flex-1 bg-gray-50 rounded-md p-2 pl-5 outline-none' type="text" disabled={!session} placeholder={session ? subreddit ? `Create a post in r/${subreddit}`: 'create a post by entering a title': 'sign in to post'} />
 
<PhotoIcon onClick={() => setImageBoxOpen(!ImageBoxOpen)} className={`h-6 cursor-pointer text-gray-300 ${ImageBoxOpen && 'text-blue-300'}`}/>
<LinkIcon className='h-6 text-gray-300'/>
</div>

{watch('postTitle') && (
  <div className='flex flex-col py-2'>
  <div className='flex items-center px-2'>
    <p className='min-w-[90px]'>Body</p>
    <input className='m-2 flex-1 bg-blue-50p-2 outline-none' {...register('postBody')} type="text" placeholder='Text (optional)'  />
  </div>


 {!subreddit && (
  <div className='flex items-center px-2'>
    <p className='min-w-[90px]'>Subreddit</p>
    <input className='m-2 flex-1 bg-blue-50p-2 outline-none' {...register('subreddit', {required: true})} type="text" placeholder='i.e. reactjs'  />
  </div>
  )}
  {
      ImageBoxOpen && (
      <div className='flex items-center px-2'>
    <p className='min-w-[90px]'>Image URL:</p>
    <input className='m-2 flex-1 bg-blue-50p-2 outline-none' {...register('postImage')} type="text" placeholder='Optional'  />
  </div>
    )
  }

 {Object.keys(errors).length > 0 && (
  <div className='space-y-2 p-2 text-red-500'>
{
  errors.postTitle?.type === 'required' && (
    <p>A Post Title is Required</p>
  )
}
  </div>
 )}

{Object.keys(errors).length > 0 && (
  <div className='space-y-2 p-2 text-red-500'>
{
  errors.subreddit?.type === 'required' && (
    <p>Subreddit is Required</p>
  )
}

  </div>
 )}


{watch('postTitle')&& (
  <button type="submit" className='w-full rounded-full bg-blue-400 p-2 text-white'>
    Create Post
    </button>
) }

  </div>




)}
    </form>
  )
}

export default Postbox