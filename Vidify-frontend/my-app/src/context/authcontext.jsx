import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'sonner';
import api from '../api/axios';
import apiFetch from '../api/apifetch';


export const AuthContext = createContext();


 function AuthProvider( { children } ){

    const [user,setUser] = useState(null);


    async function FetchUser(){
    
        try{
    const response = await apiFetch("auth/api/me","get");


    // console.log(response.data.user,"response to ayaaaa hh");
            
    setUser(response.data.user);
    }
    catch(err){
        
        setUser(null);

    console.log(err)
    
    }


    }


    useEffect(()=>{

    FetchUser();

    },[])


    return (
    <AuthContext.Provider value={{user,setUser}} >
        {children}
    </AuthContext.Provider>


  )
}

export default AuthProvider;