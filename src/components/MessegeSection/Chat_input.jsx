import React, { useState } from "react";
// import EmojiPicker from 'emoji-picker-react';
// import {Emoji} from 'emoji-picker-react';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { ChatState } from "../../Contex/chatProvider";
// import 'emoji-mart/css/emoji-mart.css'

export default function Chat_input({ socket, fetchAgain,setFetchAgain ,allMessages, setallMessages,typing, setTyping,istyping}) {

  const [message, setmessage] = useState("");
  const [showEmojibar, setShowEmojibar] = useState(false);
  const [SelectedEmoji, setSelectedEmoji] = useState(false);
  

  const {user,selectedChat,setSelectedChat}=ChatState();


  const sendmessage = async (event) => {
    // console.log("Send Message Clicked");
    // event.preventDefault();
    // if(event.key==="Enter" && message){
      socket.emit('stop typing',selectedChat._id)
      if (message.trim()) {
        // socket.emit("send_message", {
        //   text: message,
        //   name: `${localStorage.getItem("firstName")}`,
        //   id: `${socket.id}${Math.random()}`,
        // });
        
        if (!user || !user.accessToken) {
          // Handle the case when user.accessToken is null or undefined
          console.log('Access token not available');
          return;
        }
        try {
          const config = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body:JSON.stringify({
              content: message,
              chatId: selectedChat._id,
            })
          };

          setmessage("");
          let data=await fetch("http://localhost:4000/api/v1/message/",config).then((res)=>res.json());
          console.log(data);
          setallMessages([...allMessages,data]);
          socket.emit("send_message",data)
          setFetchAgain(!fetchAgain);
          
        } catch (error) {
          alert("Cant Send the Message");
        }
      }

    // }
  };

  const handleEmojibar = () => {
    setShowEmojibar(!showEmojibar);
  };
  const handleEmojiClick = (Data) => {
    console.log(Data);
    let msg = message;
    msg += Data.native;
    setmessage(msg);
  };


  const typingHandeler=(e)=>{
    setmessage(e.target.value)
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);

  }

  return (
    <div className=" bg-gray-900 p-4 h-25 rounded-b-md w-full">
      {istyping ? <div className="text-xs text-gray-500 flex items-center">Someone Typing ...</div>:<></>}
      <form >
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Upload image</span>
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={handleEmojibar}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Add emoji</span>
          </button>
          <div className="absolute bottom-24 md:bottom-40">
            {/* {showEmojibar && <EmojiPicker height={350} width={300} searchDisabled={true} onEmojiClick={handleEmojiClick} theme='dark' previewConfig={{showPreview:false}}  />} */}
            {showEmojibar && (
              <Picker
                data={data}
                onEmojiSelect={handleEmojiClick}
                previewPosition="none"
                emojiSize={20}
                dynamicWidth={true}
              />
            )}
          </div>
          <textarea
            id="chat"
            rows="1"
            className="block mx-1 p-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
            value={message}
            onChange={typingHandeler}
          ></textarea>

          <button
            type="button"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={sendmessage}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
}
