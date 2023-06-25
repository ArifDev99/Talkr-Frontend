import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";




export default function Signup() {
  const [firstname ,setFirstname]=useState("")
  const [lastname ,setLastname]=useState("")
  const [email ,setEmail]=useState("")
  const [password ,setPassword]=useState("")
  const [pic ,setPic]=useState("")
  const [loading ,setLoading]=useState(false)

  // const [error,setError] =useState(false)
  const navigate=useNavigate();

  const postanImage=(img)=>{
    setLoading(true);
    if(img===undefined){
      alert("Please Select an Image!")
      setLoading(false)
      return;
    }
    if(img.type==="image/jpeg"||img.type==="image/png"){
      const data =new FormData();
      data.append("file",img);
      data.append("upload_preset","talkr_5cslv")
      data.append("cloud_name","dwjw3esxi")

      fetch("https://api.cloudinary.com/v1_1/dwjw3esxi/image/upload",{
        method:"post",
        body:data,
      })
      .then((res)=>res.json())
      .then((data)=>{
        // console.log(data)
        console.log(data.url);
        setPic(data.url)
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false)
      })
    }else{
      alert("Please Select Correct Type of Image")
      setLoading(false)
    }

  }


  const handleuserRegister = async(e) => {
    e.preventDefault();
    let userDetails={firstname,lastname,email,password,profile_img:pic};
    // localStorage.setItem("userDetails",JSON.stringify(userDetails))
      
      let req= await fetch('http://localhost:4000/api/v1/user/signup',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(userDetails)
      })
      let message=await req.text();
      if (message !=="success"){
        // setError(true)
        alert(message)
      }
      else{
        navigate("/signin");

      }
      // alert(message);
  };

  return (
    <div className="flex justify-center items-center my-1 h-[calc(100vh-4rem)]">
      <div className="flex-col w-96 justify-center  border border-sky-500 rounded-lg  bg-slate-600 shadow p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create and account
        </h1>
        <form onSubmit={handleuserRegister} className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              First Name<span className="req">*</span>
            </label>
            <input
              className="border border-sky-500 sm:text-sm rounded-lg  focus:outline-none focus:ring-sky-500 focus:ring-1 block w-full p-2.5 "
              type="text"
              required
              autoComplete="off"
              onChange={(e)=>{setFirstname(e.target.value)}}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name<span className="req">*</span>
            </label>
            <input
              className="border border-sky-500 sm:text-sm rounded-lg  focus:outline-none focus:ring-sky-500 focus:ring-1 block w-full p-2.5 placeholder-gray-400"
              type="text"
              required
              autoComplete="off"
              onChange={(e)=>{setLastname(e.target.value)}}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email Address<span className="req">*</span>
            </label>
            <input
              className="border border-sky-500 sm:text-sm rounded-lg  focus:outline-none focus:ring-sky-500 focus:ring-1 block w-full p-2.5 placeholder-gray-400"
              type="email"
              required
              autoComplete="off"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Set A Password<span className="req">*</span>
            </label>
            <input
              className="border border-sky-500 sm:text-sm rounded-lg  focus:outline-none focus:ring-sky-500 focus:ring-1 block w-full p-2.5 placeholder-gray-400"
              type="password"
              required
              autoComplete="off"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Choose A Image
            </label>
            <input
              className="border border-sky-500 sm:text-sm rounded-lg  focus:outline-none focus:ring-sky-500 focus:ring-1 block w-full p-2.5 placeholder-gray-400"
              type="file"
              accept="image/*"
              onChange={(e)=>{postanImage(e.target.files[0])}}
            />
          </div>
          <div className="flex items-center">
            <p className="text-sm font-light text-white mr-4">
              Already have an account? <Link to={"/signin"}>LogIn Here</Link>
            </p>
            <button
              type="submit"
              
              className={`rounded-lg font-medium  p-2.5 bg-black border border-sky-500 hover:ring-1 hover:ring-sky-400 ${loading? "cursor-not-allowed opacity-25" :""}`}
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
            "Sign Up"
          )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
