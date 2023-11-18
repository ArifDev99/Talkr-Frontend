import React from 'react'

function UserListItem( {search_User,handleFunction}) {
  return (
    <div className='w-full flex justify-center  items-center px-3 py-2 my-1 border-y-2 border-black  cursor-pointer  bg-primary-dark hover:bg-light-blue-2 ' onClick={handleFunction}>
        <div className=' mx-2' >
         <img className=' w-8 h-8 rounded-full object-cover' src={search_User?.profile_img} alt="profile image" srcSet="" />
        </div>
        <div className='text-base text-black text-center'>{search_User?.firstname}</div>
    </div>
  )
}

export default UserListItem