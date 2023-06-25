import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'


export default function Layout() {
  return (
    <div className=' overflow-hidden'>
      <Navbar />
      <div className=' h-full bg-black '>
       
        <Outlet/>

      </div>
    </div>
  )
}
