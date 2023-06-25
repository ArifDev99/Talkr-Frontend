import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';

export default function Signin() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();``

  const handleLogin=async(e)=>{
    e.preventDefault();
    let userDetails={email,password};

    // if(localStorage.getItem("userDetails")){
    //   const userDetails=JSON.parse(localStorage.getItem("userDetails"))
    //   if(email===userDetails.email && password==userDetails.password){
    //     localStorage.setItem("AccessToken","1")
    //   }

    // }

    let req =await fetch('http://localhost:4000/api/v1/user/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails)
    })

    let data=await req.json();
    if (data.message!=="Successfully Login"){
      alert(data.message)
    }
    else{
      // const cookies = new Cookies();
      // cookies.set("accessToken",message.accessToken)
      // console.log(message);
      localStorage.setItem("userInfo",JSON.stringify(data));
      // localStorage.setItem("firstName",message.firstname);
      window.location.href="http://127.0.0.1:5173/"

    }
  }


  return (
    <div className='flex justify-center items-center my-1 h-[calc(100vh-4rem)]'>
    <div className="flex-col w-96 justify-center border border-sky-500 rounded-lg  bg-slate-600 shadow p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        LogIn Here
      </h1>
      <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">


        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email Address<span className="req">*</span>
          </label>
          <input
            className="border border-sky-500 sm:text-sm rounded-lg  focus:outline-none focus:ring-sky-500 focus:ring-1 block w-full p-2.5 placeholder-gray-400"
            type="email"
            required
            autoComplete="off"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password<span className="req">*</span>
          </label>
          <input
            className="border border-sky-500 sm:text-sm rounded-lg  focus:outline-none focus:ring-sky-500 focus:ring-1 block w-full p-2.5 placeholder-gray-400"
            type="password"
            required
            autoComplete="off"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="flex-end items-center">
          
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
