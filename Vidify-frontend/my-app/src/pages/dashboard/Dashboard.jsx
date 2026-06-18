import { useContext } from 'react'
import Sidebar from '../../component/sidebar'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/authcontext'









function Dashboard() {



const { user } = useContext(AuthContext)




  return (
   <div className="flex min-h-screen bg-[#171411] text-white">

  {/* Sidebar */}
  <div className="w-[250px] border-r border-gray-800 bg-[#111010] p-4">
    <Sidebar />
  </div>

  {/* Main Dashboard Content */}
  <div className="flex-1 p-8">

    <Outlet/> 

  </div>

</div>
  )
}



export default Dashboard