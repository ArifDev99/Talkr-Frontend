import React, { useEffect, useState } from 'react'
import MessegeDisplay from './MessegeSection/MessegeDisplay'
import MessegeList from './MessegeList'
import Profile from './Profile'
// import Sidebar from './Sidebar'
import { io } from "socket.io-client";
import Messege_section from './MessegeSection/Messege_section'
import { ChatState } from '../Contex/chatProvider';
// import Sidedrawer from './Sidedrawer';
// import SideDrawer2 from './SideDrawer2';

const BASE_URI=import.meta.env.VITE_BASE_URI

// var connectionOptions =  {
//             "force new connection" : true,
//             "reconnectionAttempts": "Infinity", 
//             "timeout" : 60000,                  
//             "transports" : ["websocket", "polling", "flashsocket"]
//         };

// const socket = io(`${BASE_URI}`,{
//   transports: ["websocket"]
// });
export default function Hero() {
  const [fetchAgain, setFetchAgain] = useState(false);
  // const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  // const [socket, setSocket] = useState(null);
  const { user,setSelectedChat } = ChatState();
  // const socket = io("http://localhost:4000");
  // // const [showSidedrawer,setShowSideDrawer]=useState(false);
  
  // useEffect(() => {
  //   socket.on("connect", ()=>  {
      
  //     if(user && user._id){
  //       socket.emit("setup",user);
  //       // socket.join(user._id);
  //       setSocketConnected(true);
        
  //     }else{
  //       console.error("User data is missing or incomplete.");
  //     }
  //     socket.on("Connected",(id)=>{
  //       console.log(id)
  //     })

  //     // console.log(socket.id)
  //     // setSocket(socket);
  //     // myUser=prompt("Enter Name")
  //     // socket.emit("createuser",myUser);
  //   });
  // }, [user])
  
  // console.log(socket);

  useEffect(() => {
    if (user && user._id) {
      const newSocket = io(`${BASE_URI}`,{
      transports: ["websocket"]
      });

      newSocket.on('connect', () => {

        newSocket.emit('setup', user);
        // setSocketConnected(true);
        console.log('Connected:', newSocket.id);
      });
      
      newSocket.on('Connected', (id) => {
        console.log('Connected to server with id:', id);
      });
      
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user,setSocket]);


  // if (!user || !user._id) {
  //   return <div>Please sign in to access the chat</div>;
  // }
  
  return (
    <>
    <div >
        <div className='flex justify-center h-[calc(100vh-4rem)] overflow-hidden sm:h-full mx-2' >
            {/* <div className='sidebar  w-1/5 hidden '>
              <Sidebar/>
            </div> */}
            <div className='messges-section w-full px-1 bg-gray-600  overflow-hidden sm:w-full sm:flex-col md:w-full' >
                {/* Messege Section */}
              <div className="w-full h-screen flex py-2">
                <div className='w-1/5 h-full  md:w-[50%] sm:hidden pb-16'><MessegeList fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/></div>
                <div className='w-3/5 h-full pb-16 md:w-full xl:h-full sm:px-4'><Messege_section socket={socket}  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></div>
                <div className='w-1/5 h-full pb-16 md:w-24 sm:hidden'><Profile /></div>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}
