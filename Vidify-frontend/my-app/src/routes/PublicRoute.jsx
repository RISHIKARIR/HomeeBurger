import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { Navigate, Outlet } from 'react-router-dom';



function PublicRoute() {
    
    const { user } = useContext(AuthContext);





  if(user){

    return <Navigate to={"/Dashboard"}></Navigate>

  }

  return <Outlet/>

}

export default PublicRoute