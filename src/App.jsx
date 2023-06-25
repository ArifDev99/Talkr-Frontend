import "./App.css";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
 
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
// import { io } from "socket.io-client";

// import { Cookies } from "react-cookie";
import Authchecker from "./common/Authchecker";
import { ChatState } from "./Contex/chatProvider";
import { useEffect } from "react";

// const socket = io("http://localhost:4000");

// socket.on("connect", function()  {
//   console.log(socket.id)
//   // myUser=prompt("Enter Name")
//   // socket.emit("createuser",myUser);
// });




// const cookies = new Cookies();

// const cookie=cookies.get('accessToken')
// console.log(cookie);



const isLogin= Authchecker();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Hero/>}/> */}
      <Route
       
        index
        element={ isLogin ?  <Hero />:<Navigate replace to ={"/signup"}/>} 
      />
      <Route path="/signin" index element={<Signin />} />
      <Route path="/signup" index element={<Signup />} />
    </Route>
  )
);

function App() {
    const {user,setUser}=ChatState();

  // console.log(isLogin)

  useEffect(() => {
    
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  
  }, [])
  

  return (
    <RouterProvider router={router} />
    // <RouterProvider router={router}>
    //   <Route path="/" element={isLogin ? <Navigate to="/" replace /> : <Navigate replace to ={"/signup"}/>} />
    // </RouterProvider>
  );
}

export default App;
