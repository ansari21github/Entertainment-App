import React, { useState } from 'react'
import user from "../assets/user.png"
import { TbLogout } from "react-icons/tb";
import {Link, useNavigate}  from "react-router-dom"
import { useSelector , useDispatch } from 'react-redux';
import { clearBookmarks } from '../slices/bookmarkSlice';

const Userprofile = () => {
  const [open,setOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector((state) => state.bookmarks);
  const handleLogout = () => {

    dispatch(clearBookmarks());

    localStorage.removeItem('authToken')
    console.log('Bookmarks after logout:', bookmarks);
    navigate("/login")
}
    return (
        <div className='flex gap-5 items-center '>
{(!localStorage.getItem("authToken")) ?
            
 <div className='min-w-[3rem] h-[3.5rem] last:absolute pr-2.5  bottom-14 rounded-xl relative'>
        <img src={user} alt='' className='w-full h-full rounded-full object-cover border-4 border-white cursor-pointer ' onClick={()=> setOpen(!open)}/>

{
  open && (
    <div >
<Link className='hover:text-white transition-colors duration-300 cursor-pointer text-glass absolute ' to='/login'>
<p>Login</p>
</Link>
<br/>
<Link className='hover:text-white transition-colors duration-300 cursor-pointer text-glass absolute' to='/signup'>
<p>Sign Up</p>
</Link>
</div>
  )
}
         </div> 
         :
   <div className='min-w-[3rem] h-[3.5rem] last:absolute pr-2.5  bottom-14 rounded-xl relative'>
        <img src={user} alt='' className='w-full h-full rounded-full object-cover border-4 border-white cursor-pointer ' onClick={()=> setOpen(!open)}/>

{
  open && (
    <div >
<div className='hover:text-white transition-colors duration-300 cursor-pointer text-glass absolute' onClick={handleLogout} >
<TbLogout />
<p>Logout</p>
</div>
</div>
  )
}
         </div> }


        </div>
        
       
      )
    }


export default Userprofile;