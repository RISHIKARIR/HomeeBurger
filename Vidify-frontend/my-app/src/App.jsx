import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/auth/login'
import { Routes,Route } from 'react-router-dom'
import SignUp from './pages/auth/signup'
import Forgot from './pages/auth/forgot'
import Dashboard from './pages/dashboard/Dashboard'
import Settings from './pages/dashboard/settings'
import Upload from './pages/dashboard/Upload'
import Youraccount from './pages/dashboard/Youraccount'
import YourVideos from './pages/dashboard/YourVideos'
import authcontext from './context/authcontext'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

  <Routes>
    <Route element={<PublicRoute/>}>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/forgot-password' element={<Forgot/>}></Route>
    <Route path='/signup' element={<SignUp/>}></Route>
    </Route>

    <Route element={<PrivateRoute/>}>
    <Route path='/Dashboard' element={<Dashboard/>}>
      <Route path='settings' element={<Settings/>}></Route>
      <Route path='Upload' element={<Upload/>}></Route>
      <Route path='Youraccount' element={<Youraccount/>}></Route>
      <Route path='Yourvideos' element={<YourVideos/>}></Route>
    </Route>
    
    
    </Route>

    </Routes>

    </>
  )
}

export default App
