import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './logout'

function Sidebar() {
  return (
<div className="flex flex-col gap-3 text-white">

  <NavLink to={"Yourvideos"} className="cursor-pointer rounded-xl px-4 py-3 transition-all duration-200 hover:bg-zinc-800 hover:text-green-400">
    Your Videos
  </NavLink>

  <NavLink to={"settings"} className="cursor-pointer rounded-xl px-4 py-3 transition-all duration-200 hover:bg-zinc-800 hover:text-green-400">
    Settings
  </NavLink>



  <NavLink to={"Youraccount"} className="cursor-pointer rounded-xl px-4 py-3 transition-all duration-200 hover:bg-zinc-800 hover:text-green-400">
    Your Account
  </NavLink>

  <NavLink to={"Upload"} className="cursor-pointer rounded-xl bg-green-600 px-4 py-3 font-semibold transition-all duration-200 hover:bg-green-700">
    Upload Video
  </NavLink>










<div>
  <Logout/>
</div>
</div>

  )
}

export default Sidebar