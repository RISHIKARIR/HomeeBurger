import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from "../../api/axios.js"
import { toast } from 'sonner';
import LoadingSpinner from "../../component/spinner.jsx"
import { Eye, EyeOff, Verified } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function Forgot() {

    const [isVerifiedMail,setVerifiedMail] = useState(false);
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [otp,setOtp] = useState(null);
    const [isVerifiedOtp,setIsVerifiedOtp] = useState(false)
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState(""); 
    const [count,setCount] = useState(0);
    const [timer,setTimer] = useState(5);





  const navigate = useNavigate();








 async function sendOtp(e){
    e.preventDefault();
    setLoading(true);

    try{
    if(email.trim().length === 0){
      toast.error("Please Enter a valid email address");
      return;
    }

   const result = await api.post("auth/api/forgot-password",{
        email
    });

    toast.success(result.data.message);

    setVerifiedMail(true);

    return;

    }catch(err){
      toast.error(err.response.data.message);
      console.log(err.response,"error")
      

    }finally{
      setLoading(false);
      

    }

  }

  
    async function submitotp(e){
      e.preventDefault();

      if(otp.length > 6 || otp.length<6){
        toast.error("Otp should be equal to 6 digits")
        return;
      }


      try{
    
      const response =  await api.post("auth/api/verify-otp",{
       otp,email
      })


    if(response.data.success){
      toast.success(response.data.message);
      setIsVerifiedOtp(true); 
    }

      }catch(err){
        toast.error(err.response.data.message)
      }
    }



   async function SubmitPassword(e){
      e.preventDefault();

      if(password.trim() === "" || confirmPassword.trim() === ""){
        toast.error("Password and confirm Password cannot be empty");
        return;
      }


      if(password.trim() != confirmPassword.trim()){
        toast.error("Password and Confirm Password should be same");
        return;
      }

      if(password.length < 8){
        toast.error("Password should be minimum of 6 digits");
        return;
      }

      try{
      const response = await api.put("/change-password",{
        password
      })

      if(response.data.success){
        toast.success(response.data.message);
        navigate("/") 
      }
      }catch(err){
          console.log(err,"error to dikha");
        toast.error(err.response.data.message);
      }
    }



    useEffect(()=>{
      if(timer<=0)return;

      setTimeout(()=>{

        setTimer((prev)=>{
          return prev-1;
        })

      },1000)
      


    },[timer,isVerifiedMail])


console.log(isVerifiedMail,"verifieddd");



  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e8e8ff] via-[#f5f5f5] to-[#dff2ff] px-4'>

    {!isVerifiedOtp ? (
        <div className='w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-[35px] p-10'>

         
          <div className='text-center mb-10'>
            <h1 className='text-3xl font-semibold text-black'>
              Forgot Password
            </h1>

            <p className='text-gray-600 mt-3 text-lg'>
              Enter your email to receive OTP
            </p>
          </div>

          
          <div>
            <form className='flex flex-col gap-6' onSubmit={(e)=>{sendOtp(e)}}>

             
              <div className='flex flex-col gap-2'>
                <label className='text-lg font-semibold text-black'>
                  Email
                </label>

                <input onChange={(e)=>{setEmail(e.target.value)}}
                  type='email'
                  name='email'
                  placeholder='user@email.com'
                  className='w-full border rounded-2xl px-3 py-2 outline-none text-lg bg-transparent focus:ring-2 focus:ring-green-400 transition-all duration-200'
                />
                <span className='text-sm text-red-500'> { timer}</span>
              </div>
                    

          
              <button className='w-full bg-[#05c94b] hover:bg-[#03b843] text-white font-semibold text-xl py-2 rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-2 disabled:opacity-50'
              disabled={loading}
              >
                

  {loading ? (

    <div className='flex items-center justify-center gap-2'>
      <LoadingSpinner />
      <span>Sending...</span>
    </div>

  ) : (
       isVerifiedMail ?  "Resend Otp" : "Send Otp"
  )}

</button>

            </form>
          </div>

          <div className='text-center mt-8'>
            <p className='text-gray-600'>
              Remember your password?{" "}
            <Link to={'/'} className='font-semibold text-black cursor-pointer hover:text-green-500'>Login     </Link>
            </p>


            


          </div>




           {isVerifiedMail &&    <form className='flex flex-col gap-6 mt-8' onSubmit={submitotp}>

  {/* OTP Input */}
  <div className='flex flex-col gap-2'>

    <label className='text-lg font-semibold text-black'>
      Enter OTP
    </label>

    <input
      type='number'
      onChange={(e)=>{setOtp(e.target.value)}}
      maxLength={6}
      placeholder='Enter 6 digit OTP'
      className='w-full border border-black/70 rounded-2xl px-3 py-2 outline-none text-lg bg-transparent focus:ring-2 focus:ring-green-500 transition-all duration-200'
    />

  </div>

  {/* Verify Button */}
  <button className='w-full bg-[#05c94b] hover:bg-[#03b843] text-white font-semibold text-xl py-2 rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
  
  >

    Verify OTP

  </button>

</form>


}







        </div>

      
     




) : (

<div className='w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-[35px] p-10'>

  {/* Heading */}
  <div className='text-center mb-10'>

    <h1 className='text-3xl font-semibold text-black'>
      Create New Password
    </h1>

    <p className='text-gray-600 mt-3 text-lg'>
      Enter your new password below
    </p>

  </div>

  {/* Form */}
  <form className='flex flex-col gap-6' onSubmit={SubmitPassword}>

    {/* New Password */}
    <div className='flex flex-col relative gap-2'>

      <label className='text-lg font-semibold text-black'>
        New Password
      </label>

      <input
        type={showPassword ? "text" : "password"}
        placeholder='Enter new Password'
        className='w-full border rounded-2xl px-3 py-2 outline-none text-lg bg-transparent focus:ring-2 focus:ring-green-400 transition-all duration-200'
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}

      /><button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                absolute
                right-4
                top-2/3
                -translate-y-1/3
                text-muted
                hover:text-main
                transition-colors
                cursor-pointer">
                {showPassword ? <Eye/> : <EyeOff/> }
              </button>
      

    </div>

    {/* Confirm Password */}
    <div className='flex relative flex-col gap-2'>

      <label className='text-lg font-semibold text-black'>
        Confirm Password
      </label>

      <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder='Confirm new password'
        className='w-full border rounded-2xl px-3 py-2 outline-none text-lg bg-transparent focus:ring-2 focus:ring-green-400 transition-all duration-200'
        value={confirmPassword}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
      />
             <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                absolute
                right-4
                top-2/3
                -translate-y-1/3
                text-muted
                hover:text-main
                transition-colors
                cursor-pointer
              "
              >
                {showConfirmPassword   ? <Eye/> : <EyeOff/> }
              </button>

    </div>

    {/* Button */}
    <button
      className='w-full bg-[#05c94b] hover:bg-[#03b843] text-white font-semibold text-xl py-2 rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
    >

      Reset Password

    </button>

  </form>

</div>




)



}
      



      </div>
    </>
  )
}

export default Forgot

