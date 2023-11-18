import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
import bgimg from "../assets/bgImage.jpg"

const BASE_URI=import.meta.env.VITE_BASE_URI



export default function Signin() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading ,setLoading]=useState(false)
  const navigate=useNavigate();``

  const handleLogin=async(e)=>{

    e.preventDefault();
    setLoading(false)
    let userDetails={email,password};

    // if(localStorage.getItem("userDetails")){
    //   const userDetails=JSON.parse(localStorage.getItem("userDetails"))
    //   if(email===userDetails.email && password==userDetails.password){
    //     localStorage.setItem("AccessToken","1")
    //   }

    // }

    setLoading(true);

    let req =await fetch(`${BASE_URI}api/v1/user/login`,{
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
      setLoading(false);
      // const cookies = new Cookies();
      // cookies.set("accessToken",message.accessToken)
      // console.log(message);
      localStorage.setItem("userInfo",JSON.stringify(data));
      // localStorage.setItem("firstName",message.firstname);
      window.location.href="http://localhost:5173/"  
      // window.location.href="https://talkr-frontend.vercel.app/"  

    }
  }


  return (
    <div className='flex justify-between items-center h-[calc(100vh-4rem)]'>
      <div className="w-[50%]">
        <img className="bgimg" src={bgimg}/>
      </div>

    <div className="flex justify-center items-center w-[50%]">
      <div className="flex-col w-96 justify-center rounded-md shadow-2xl   p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-dark md:text-2xl ">
          LOGIN
        </h1>
        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">


          <div>
            <label className="block  text-sm font-medium text-dark ">
              Email Address<span className="req">*</span>
            </label>
            <input
              className="border-b border-primary-dark sm:text-sm  text-black  focus:outline-none focus:border-b-2  block w-full p-2.5 bg-primary-light"
              type="email"
              required
              autoComplete="off"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block  text-sm font-medium text-dark ">
              Password<span className="req">*</span>
            </label>
            <input
              className="border-b border-primary-dark sm:text-sm  text-black  focus:outline-none focus:border-b-2  block w-full p-2.5 bg-primary-light"
              type="password"
              required
              autoComplete="off"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="flex-end items-center">
            
          <button
                type="submit"
                
                className={`w-full rounded-lg font-medium text-primary-light  p-2.5 bg-dark border hover:bg-dark-seconday  ${loading? "cursor-not-allowed opacity-25" :""}`}
                disabled={loading}
              >
                {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Login"
            )}
              </button>

            <p className="text-sm font-light text-dark mt-1">
                For New User | <Link to={"/signup"}>Register Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>

    </div>
  );
}
