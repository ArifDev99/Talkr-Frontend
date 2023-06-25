import React, { useEffect, useRef, useState } from "react";
import Chatbar from "./Chatbar";
import Chat_input from "./Chat_input";
import MessegeDisplay from "./MessegeDisplay";
import Dialog from "./Dialog";
import { ChatState } from "../../Contex/chatProvider";
import MessegeList from "../MessegeList";
import { io } from "socket.io-client";

import Loading from "../../common/Loading";

var selectedChatCompare;
export default function Messege_section({ socket, fetchAgain, setFetchAgain }) {
  const [allMessages, setallMessages] = useState([]);
  const [isShowMyChats, setIsShowMyChats] = useState(false);
  const [showMessageDisplay, setShowMessageDisplay] = useState(false);
  
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lastMessageRef = useRef(null);
  const { user, selectedChat,notification, setNotification } = ChatState();

  const showMychats = () => {
    console.log("show My Chats Clicked");
    setIsShowMyChats(!isShowMyChats);
  };

  // const [showSidedrawer,setShowSideDrawer]=useState(false);
  
  // useEffect(() => {
    //   socket?.on("update", (data) => setMessages([...messages, data]));
  // }, [socket, messages]);

  console.log("Notification",notification);
  
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  const fetchAllMessages = async () => {
    setIsLoading(true);
    // console.log("FetchAll Message Called");
    // console.log(selectedChat);
    if (!user || !user.accessToken) {
      // Handle the case when user.accessToken is null or undefined
      console.log("Access token not available");
      return;
    }
    try {
      // console.log("From Try");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      
      let data = await fetch(
        `http://localhost:4000/api/v1/message/${selectedChat._id}`,
        config
        ).then((res) => res.json());
        // console.log(data);
        setIsLoading(false);
        setallMessages(data);
        // setFetchAgain(!fetchAgain);
        socket.emit("join chat", selectedChat._id);
      } catch (error) {
        // alert("Cant fetch the Messages");
        setIsLoading(false)
        console.log("Can't Fetch the Messages");
      }
    };
    
    useEffect(() => {
      fetchAllMessages();
      setIsShowMyChats(false);
      // for keep tarck of Selected Chat
      selectedChatCompare = selectedChat;
    }, [selectedChat, user]);
    
    useEffect(() => {
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
      socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // give a Notification
        if(!(notification.includes(newMessageRecieved))){
          
          setNotification([newMessageRecieved,...notification])
          setFetchAgain(!fetchAgain);
        }

      } else {
        setallMessages([...allMessages, newMessageRecieved]);
      }
    });
  });



  return (
    <>
      {isShowMyChats ? (
        <MessegeList fetchAgain={fetchAgain} />
      ) : (
        <div className="flex flex-col justify-center h-full  px-1 md:p-0 ">
          {isLoading ? <Loading/>:
          <>
          <Chatbar
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            showMychats={showMychats}
          />
          {selectedChat ? (
            <MessegeDisplay
              messages={allMessages}
              user={user}
              lastMessageRef={lastMessageRef}
            />
          ) : (
            <Dialog />
          )}
          <Chat_input
            allMessages={allMessages}
            setallMessages={setallMessages}
            socket={socket}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            typing={typing}
            setTyping={setTyping}
            istyping={istyping}
            
          />
          </>}
        </div>
      )}
    </>
  );
}
