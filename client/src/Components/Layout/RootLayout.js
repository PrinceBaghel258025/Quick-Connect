import React from 'react'
import Sidebar from '../Sidebar'
const RootLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-full h-screen overflow-scroll md:w-1/4  bg-slate-800 text-white'><Sidebar /></div>
        <div className='bg-gray-400 md:w-3/4'>{children}</div>
    </div>
  )
}

export default RootLayout