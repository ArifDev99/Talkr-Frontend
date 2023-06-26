import React, { useState } from "react";
import { ChatState } from "../../Contex/chatProvider";


const BASE_URI=import.meta.env.VITE_BASE_URI

export default function RenameGr({fetchAgain, setFetchAgain}) {
  const [groupchatName, setgroupchatName] = useState("");
  const { user, chats, setChats,selectedChat, setSelectedChat } = ChatState();

  const handleSulbmit = async () => {
    if (!groupchatName) {
      alert("Please Enter Group Name");
      return;
    }
    if (!user || !user.accessToken) {
      // Handle the case when user.accessToken is null or undefined
      console.log('Access token not available');
      return;
    }
    try {
      const config = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
            chatId:selectedChat._id,
            chatName: groupchatName,
        }),
      };
      let data = await fetch(
        `${BASE_URI}api/v1/chat/rename_group`,
        config
      ).then((res) => res.json());
      // setChats([data, ...chats]);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      close(false);
    } catch (error) {
      alert(error);
      return;
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="self-center mb-2 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Group Rename
      </div>
      <div className="flex relative ">
        <input
          type="text"
          className=" rounded-lg flex-1 appearance-none bg-black border border-gray-300 w-full py-2 px-4  text-gray-700 placeholder-gray-200 shadow-sm text-base focus:outline-none focus:ring-1 focus:border-transparent"
          placeholder="Your Group Name"
          onChange={(e) => setgroupchatName(e.target.value)}
        />
      </div>
      <div className="flex w-full">
        <button
          type="button"
          className="py-2 px-4  bg-gray-700 hover:bg-gray-900 focus:ring-black  text-gray-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          onClick={handleSulbmit}
        >
          submit
        </button>
      </div>
    </div>
  );
}
