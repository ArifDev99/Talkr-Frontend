import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimg from "../assets/bgImage.jpg"

const BASE_URI=import.meta.env.VITE_BASE_URI





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
    setLoading(true);
    e.preventDefault();
    let userDetails={firstname,lastname,email,password,profile_img:pic};
    // localStorage.setItem("userDetails",JSON.stringify(userDetails))
      
      let req= await fetch(`${BASE_URI}api/v1/user/signup`,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(userDetails)
      })
      let data=await req.json();
      console.log(data);
      if (data.message !=="Successfully created"){
        // setError(true)
        setLoading(false)
        alert(data.message)
      }
      else{
        setLoading(false)
        alert("User Successfully created")
        navigate("/signin");

      }
      // alert(message);
  };
  return (
    <div className="flex justify-between items-center h-[calc(100vh-4rem)] sm:flex-col">
      <div className="flex justify-center items-center w-[50%] sm:w-full p-4">
        <div className="flex-col w-96 justify-center rounded-md shadow-2xl p-6 space-y-4 md:space-y-6 sm:p-8 text-black">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-dark md:text-2xl ">
            Create and account
          </h1>
          <form onSubmit={handleuserRegister} className="space-y-4 md:space-y-6">
            <div>
              <label className="block  text-sm font-medium text-dark ">
                First Name<span className="req">*</span>
              </label>
              <input
                className="border-b border-primary-dark sm:text-sm  text-black  focus:outline-none focus:border-b-2  block w-full p-2.5 bg-primary-light "
                type="text"
                required
                autoComplete="off"
                onChange={(e)=>{setFirstname(e.target.value)}}
              />
            </div>

            <div>
              <label className="block  text-sm font-medium text-dark ">
                Last Name<span className="req">*</span>
              </label>
              <input
                className="border-b border-primary-dark sm:text-sm  text-black  focus:outline-none focus:border-b-2  block w-full p-2.5 bg-primary-light"
                type="text"
                required
                autoComplete="off"
                onChange={(e)=>{setLastname(e.target.value)}}
              />
            </div>

            <div>
              <label className="block  text-sm font-medium text-dark ">
                Email Address<span className="req">*</span>
              </label>
              <input
                className="border-b border-primary-dark sm:text-sm  text-black  focus:outline-none focus:border-b-2  block w-full p-2.5 bg-primary-light"
                type="email"
                required
                autoComplete="off"
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>

            <div>
              <label className="block  text-sm font-medium text-dark ">
                Set A Password<span className="req">*</span>
              </label>
              <input
                className="border-b border-primary-dark sm:text-sm  text-black  focus:outline-none focus:border-b-2  block w-full p-2.5 bg-primary-light"
                type="password"
                required
                autoComplete="off"
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>
            <div>
              <label className="block  text-sm font-medium text-dark ">
                Choose A Image
              </label>
              <input
                className=" sm:text-sm rounded-lg  focus:outline-none block w-full p-2.5 placeholder-indigo-800"
                type="file"
                accept="image/*"
                onChange={(e)=>{postanImage(e.target.files[0])}}
              />
            </div>
            <div className="flex-col w-full">
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
              "Sign Up"
            )}
              </button>
              <p className="text-sm font-light text-dark mt-1">
                Already have an account? <Link to={"/signin"}>LogIn Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[50%] sm:hidden">
        <img className="bgimg" src={bgimg} />
      </div>
    </div>
  );
}
