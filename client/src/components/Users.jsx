import React from 'react'

export const Users = ({user}) => {
  return (
    <>
        <div className='flex items-center text-white min-h-16 px-5 shadow-sm hover:bg-[#1d2c3b]'>
            {user.name}
        </div>
    </>
  )
}
