import "./App.css";
import { useEffect,lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  
} from "react-router-dom";

const Layout = lazy(() => import('./components/Layout'));
const Hero = lazy(() => import('./components/Hero'));
const Signup = lazy(() => import('./components/Signup'));
const Signin = lazy(() => import('./components/Signin'));
// import { io } from "socket.io-client";

// import { Cookies } from "react-cookie";
import Authchecker from "./common/Authchecker";
import ChatProvider, { ChatState } from "./Contex/chatProvider";



// const socket = io("http://localhost:4000");

// socket.on("connect", function()  {
//   console.log(socket.id)
//   // myUser=prompt("Enter Name")
//   // socket.emit("createuser",myUser);
// });




// const cookies = new Cookies();

// const cookie=cookies.get('accessToken')
// console.log(cookie);





function App() {
  // const {user,setUser}=ChatState();
  
  // useEffect(() => {
    
  //   const userInfo=JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
    
  // }, [setUser]);
  
  const isLogin= Authchecker();
  // console.log(isLogin)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Layout /></Suspense>}>
        {/* <Route index element={<Hero/>}/> */}
        <Route
         
         index
         element={ 
          <Suspense fallback={<div>Loading...</div>}>
          {isLogin ?  <Hero />:<Navigate replace to ={"/signup"}/>}
          </Suspense>
        } 
         />
        <Route path="/signin" index element={<Suspense fallback={<div>Loading...</div>}><Signin /></Suspense>} />
        <Route path="/signup" index element={<Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>} />
      </Route>
    )
  );

  

  return (
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
    // <RouterProvider router={router}>
    //   <Route path="/" element={isLogin ? <Navigate to="/" replace /> : <Navigate replace to ={"/signup"}/>} />
    // </RouterProvider>
  );
}

export default App;
