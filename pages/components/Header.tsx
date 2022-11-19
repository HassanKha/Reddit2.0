import Image from 'next/image'
import React from 'react'
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, Bars2Icon, Bars3Icon, BellIcon, ChatBubbleLeftIcon, ChevronDownIcon, GlobeAltIcon, HomeIcon ,MagnifyingGlassIcon, PlusIcon, SparklesIcon, SpeakerWaveIcon, VideoCameraIcon} from '@heroicons/react/24/solid'
import { } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit  } from '@fortawesome/free-brands-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import  Link  from "next/link";
function Header() {
const {data: session} = useSession();

  return (
    <div className='flex bg-white px-4 py-2 shadow-sm'>
        <div className=' relative h-10 w-20 flex-shrink-0 cursor-pointer'>
            <Link href="/">
        <FontAwesomeIcon className=' text-orange-400 h-full w-full '  icon={faReddit}  />
        </Link>
        </div>
        <div className='mx-7 flex items-center xl:min-w-[300px]'>
            <HomeIcon className='h-5 w-5'/>
            <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
            <ChevronDownIcon className='h-5 w-5' />
        </div>

        <form className='flex flex-1 items-center py-1 px-3 bg-gray-100 space-x-2 border rounded-sm border-gray-200'>
            <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
            <input className="flex-1 bg-transparent outline-none" type="text" placeholder='Search Reddit'/>
            <button type='submit' hidden/>
        </form>
<div className='flex mx-5 hidden text-gray-500 space-x-2 items-gray-500 lg:inline-flex'>
<SparklesIcon className='icon'/>
<GlobeAltIcon className='icon'/>
<VideoCameraIcon className='icon'/>
<hr h-10 border border-gray-100/>
<ChatBubbleLeftIcon className='icon'/>
<BellIcon className='icon'/>
<PlusIcon className='icon'/>
<SpeakerWaveIcon className='icon'/>
</div>
<div className='ml-5 flex items-center lg:hidden'>
    <Bars3Icon className='icon'/>
</div>
{!session ? (
    <div onClick={signIn} className='hidden  cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex'>
    <div className='flex  items-center relative h-15 w-15 flex-shrink-0'>
        <ArrowRightOnRectangleIcon className='h-7 w-7  ' />
        <p className='text-gray-400 text-s ml-2'>Sign In</p>
    </div>
</div>
)
:(
<div onClick={signOut} className='hidden  cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex'>
    <div className='flex  items-center relative h-15 w-15 flex-shrink-0'>
        <ArrowLeftOnRectangleIcon className='h-7 w-7 ' />
        <div className='flex-1 text-xs'>
        <p className='text-gray-400 text-s ml-2'>{session?.user?.name }</p>
        <p className='text-gray-400 text-s ml-2'>Sign Out</p>
        </div>
        <ChevronDownIcon className='h-4 flex-shrink-0 text-gray-400' />
    </div>
    
</div>
)
}

    </div>
  )
}

export default Header