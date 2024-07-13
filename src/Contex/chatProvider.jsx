import React, { createContext, useContext, useEffect, useState } from "react";
// import {useHistory} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const ChatContext=createContext();

const ChatProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [notification, setNotification] = useState([]);

    // const navigate=useNavigate();

    useEffect(() => {
        const userInfo=JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
    }, [])
   

    return (
        <ChatContext.Provider value={{user, setUser,chats, setChats,selectedChat, setSelectedChat, loggedUser, setLoggedUser,notification, setNotification}}>
            {children}
        </ChatContext.Provider>
    );
}

export const ChatState=()=>{
    return useContext(ChatContext);
}

export default ChatProvider;