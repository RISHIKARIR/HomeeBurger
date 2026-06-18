import { React,useContext, useEffect } from 'react'
import { AuthContext } from '../context/authcontext'
import { Navigate,Outlet } from 'react-router-dom';




function PrivateRoute(){


    const { user } = useContext(AuthContext);

    if(user){
       return <Outlet/>
    }
        
        
        return <Navigate to={"/"}></Navigate>

 




}

export default PrivateRoute