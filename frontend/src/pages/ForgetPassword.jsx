import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {serverUrl} from '../config/server'
import {toast} from 'react-toastify'
import axios from 'axios'
import Loader from '../components/Loader'

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail]= useState("");
  const [otp, setOtp] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // for step 1
  const sendOtpHandler = async()=>{
   // e.preventDefault();
      setLoading(true);
      try {
        const result = await axios.post(`${serverUrl}/api/auth/sendotp`,{email}, {withCredentials : true});
       // console.log(result.data);
        setLoading(false)
        setStep(2);
        toast.success(result.data.message)

      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        setLoading(false)

      }
  }

  // for step 2
  const verifyOtpHandler = async()=>{
   // e.preventDefault();
    setLoading(true);
    try {
       const res = await axios.post(`${serverUrl}/api/auth/verifyotp`,{email,otp},{withCredentials: true});
       setStep(3);
      /// console.log(res.data)
       setLoading(false);
       toast.success(res.data.message)

    } catch (error) {
      console.log(error);
        toast.error(error.response.data.message)
        setLoading(false)
    }
  }

  // Step 3
  const resetPasswordHandlerr = async ()=>{
    setLoading(true);
    try {

      if(newpassword !==confirmPassword) {
        return toast.error("Password is not matched")
      }
      const res = await axios.post(`${serverUrl}/api/auth/resetpassword`,{email, newpassword},{withCredentials: true});
      // console.log(res.data)
       setLoading(false);
       navigate('/login')
       toast.success(res.data.message)

    } catch (error) {
      console.log(error);
        toast.error(error.response.data.message)
        setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forget Your Password</h2>

          <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter your email address
              </label>

              <input
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                id="email"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
                required
              />
            </div>
            <button 
            onClick={sendOtpHandler}
            className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer disabled={laoding}">
              {
                loading ? <Loader/> : "Send Otp"
              }
              </button>
            <div 
            onClick={()=>navigate('/login')}
            className="text-sm text-center mt-4 cursor-pointer">Back to Login</div>
          </form>
        </div>
      )}


       {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter Otp</h2>

          <form className="space-y-4 " onSubmit={(e)=>e.preventDefault()}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Please enter 4-digit code sent to your email.
              </label>

              <input
               
                id="otp"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="* * * *"
                onChange={(e)=>setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>
            <button 
            onClick={verifyOtpHandler}
            className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer disabled:{loading} ">
              {
                loading ? <Loader/> : "Verify Otp"
              }
            </button>
            <div 
            onClick={()=>navigate('/login')}
            className="text-sm text-center mt-4 cursor-pointer">Back to Login</div>
          </form>
        </div>
      )}

       {/* Step 2 */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2>
          <p className="text-sm text-gray-500 text-center mb-4">Enter a new password to regain access to your account</p>
          <form className="space-y-4 " onSubmit={(e)=>e.preventDefault()}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>

              <input
                id="password"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="**********"
                onChange={(e)=>setNewPassword(e.target.value)}
                value={newpassword}
                required
              />
            </div>
            <div>
              <label htmlFor="cnfpassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                id="cnfpassword"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e)=>setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="**********"
                required
              />
            </div>
            <button 
            onClick={resetPasswordHandlerr}
            className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer disabled:{loading} ">
              {
                loading ? <Loader/> : "Reset Password"
              }
            </button>
            <div 
            onClick={()=>navigate('/login')}
            className="text-sm text-center mt-4 cursor-pointer">Back to Login</div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
