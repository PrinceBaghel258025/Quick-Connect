import React from 'react'

const SignIn = ({setAuth}) => {

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-600'>
        <button className='bg-slate-800 px-4 py-3 text-white text-sm font-mono' onClick={() => setAuth(prev => !prev)}>SignIn</button>
    </div>
  )
}

export default SignIn