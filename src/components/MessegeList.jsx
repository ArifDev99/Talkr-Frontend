import React, { useEffect, useState } from "react";
import { ChatState } from "../Contex/chatProvider";
import { getSenderImg, getSenderName } from "./utils/chatLogis";
import Loading from "../common/Loading";





export default function MessegeList({fetchAgain, setFetchAgain}) {
  // const [loggedUser, setLoggedUser] = useState();
  const [allChats, setAllChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user, chats, setChats,selectedChat,setSelectedChat,loggedUser, setLoggedUser } = ChatState();

  const fecthChats = async () => {
    setIsLoading(true);
    if (!user || !user.accessToken) {
      // Handle the case when user.accessToken is null or undefined
      console.log('Access token not available');
      return;
    }
    try {
      let data = await fetch("http://localhost:4000/api/v1/chat", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }).then((res) => res.json());
      setIsLoading(false);
      setAllChats(data);
      setChats(data);
      // console.log(data);
      
      
    } catch (error) {
      setIsLoading(false);
      console.log('Error fetching chats:', error);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fecthChats();
  }, [user,fetchAgain]);
  
  return (
    <div className="flex flex-col h-full p-1 rounded-lg bg-gray-900 justify-center items-center mx-1">
      <div className="flex py-2 justify-between items-center pl-2 w-full  text-sm font-medium text-white border-b-2">
        My Chats
      </div>
      {/* {isLoading ? <Loading/>: */}
      <div className="flex flex-col p-2 w-full h-full overflow-y-hidden ">
        {chats ? (
          <div className="overflow-y-scroll flex flex-col gap-1 cursor-pointer">
            {chats.map((chat) => (
              <div
                className={`flex items-center gap-3 py-2 px-3 text-sm rounded-lg border border-slate-900 bg-gray-600 hover:bg-gray-700 focus:bg-slate-800 ${selectedChat === chat ? "bg-slate-800" : "bg-gray-600" }`}
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
              >
                <img
                  className=" w-8 h-8 rounded-full object-cover"
                  src={
                    chat.isGroupChat
                      ? " "
                      : getSenderImg(loggedUser, chat.users)
                  }
                  alt="profile image"
                  srcSet=""
                />
                {chat.isGroupChat
                  ? chat.chatName
                  : getSenderName(loggedUser, chat.users)}
                {/* <span>
                    {chat.latestMessage && (
                      <p>
                        {chat.latestMessage.content.length>}
                      </p>
                    )}
                  </span> */}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* } */}
    </div>
  );
}
