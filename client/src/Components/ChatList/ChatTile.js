import React from 'react'
import logo from './../../logo.svg'
const Tile = () => {
  return (
    <div className='flex items-center py-2 my-2 mx-2 rounded-xl bg-emerald-600'>
        <img src={logo} alt="avatar" className='w-16 h-16 rounded-full' />
        <div className='ml-3 overflow-hidden'>
            <div className='text-sm font-medium text-slate-900'>Prince</div>
            <p className='text-sm text-slate-700'>This is the latest message</p>
        </div>
    </div>
  )
}

export default Tile