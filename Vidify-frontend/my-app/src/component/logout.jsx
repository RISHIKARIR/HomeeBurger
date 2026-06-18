import {useContext,React} from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authcontext';
import { toast } from 'sonner';

function Logout() {
  const Navigate = useNavigate();

  const { setUser } = useContext(AuthContext)




 async  function Logoutt(){
    try{
      const response = await api.post('auth/api/logout');

      console.log(response);

      setUser(null)

      Navigate('/')
      toast.success("Logged Out successfully");

      

    }catch(err){console.log(err)}


  }



  return (
    <div>
        
    <div className="border p-2 bg-red-400" onClick={Logoutt}>
        Logout
    </div>
    


    
    </div>
  )
}

export default Logout