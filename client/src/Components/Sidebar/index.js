import React from 'react'
import ChatTile from '../ChatList/ChatTile'
import useColorMode from '../../hooks/useColorMode';

const Sidebar = () => {

    const [colorMode, setColorMode] = useColorMode();

    return (
        <div>
            <div>
                <div className='flex items-center justify-between px-2 py-2'>
                    <div className='text-xl font-medium'>Quick Chat</div>
                    <button className='px-2 py-2 rounded-full bg-blue-900 dark:bg-blue-300' onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}>toogle</button>
                </div>
                <div className='flex justify-center my-4 mx-auto '>
                    <input type='search' placeholder='type to start a conversation' className='w-full rounded-xl px-2 py-1 mx-4 outline-none bg-green-50 text-lime-600' />
                </div>
                <hr className='my-2 bg-gray-900 text-gray-950' />
            </div>
            <div className='mt-4'>

                <ChatTile />
                <ChatTile />
                <ChatTile />
                <ChatTile />
                <ChatTile />
                <ChatTile />
                <ChatTile />
                <ChatTile />
            </div>
        </div>
    )
}

export default Sidebar