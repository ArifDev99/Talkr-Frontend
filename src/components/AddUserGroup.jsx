import React, { useState } from "react";
import BadgedUser from "./BadgedUser";
import { ChatState } from "../Contex/chatProvider";
import UserListItem from "./UserListItem";

export default function AddUserGroup({fetchAgain, setFetchAgain}) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { user,selectedChat,setSelectedChat } = ChatState();
  const handleSulbmit = () => {};

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    if (!user || !user.accessToken) {
      // Handle the case when user.accessToken is null or undefined
      console.log("Access token not available");
      return;
    }
    setSearch(query);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const fetchdata = await fetch(
        `http://localhost:4000/api/v1/user?search=${search}`,
        config
      ).then((res) => res.json());
      setSearchResult(fetchdata);
      console.log(fetchdata);
    } catch (error) {
      alert("Cannot fetch");
    }
  };

  const selectFrined = async(friend) => {
    if (selectedChat.users.find((u)=>u._id===friend._id)) {
      alert("user already Added!");
      return ;
    } 
    if (selectedChat.groupAdmin._id !== user._id) {
        alert("Only admins can add someone!");
        return;
      }
    else {
        if (!user || !user.accessToken) {
            // Handle the case when user.accessToken is null or undefined
            console.log("Access token not available");
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
                    userid: friend._id,
                }),
              };
      
            const fetchdata = await fetch(
              `http://localhost:4000/api/v1/chat/addtogroup`,
              config
            ).then((res) => res.json());
            setSelectedChat(fetchdata);
            setFetchAgain(!fetchAgain);

            // setSearchResult(fetchdata);
            console.log(fetchdata);
          } catch (error) {
            alert("Cannot fetch");
          }
        }
    }


  console.log("Selected UserLIst", selectedUsers);

  const handleDelete = async (Deluser) => {
    if (selectedChat.groupAdmin._id !== user._id && Deluser._id !== user._id) {
        alert("Only Admins Can Romove Someone !")
        return;
    }
    if (!user || !user.accessToken) {
        // Handle the case when user.accessToken is null or undefined
        console.log("Access token not available");
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
                userid: Deluser._id,
            }),
        };
  
        const fetchdata = await fetch(
          `http://localhost:4000/api/v1/chat/removefromgroup`,
          config
        ).then((res) => res.json());
        setSelectedChat(fetchdata);
        setFetchAgain(!fetchAgain);

        // setSearchResult(fetchdata);
        console.log(fetchdata);
    } catch (error) {
        alert("Cannot fetch");
    }
    }

  return (
    <div>
      <div className="flex flex-col mb-2">
        <div className="flex relative ">
          <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-black border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            id="sign-in-email"
            
            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-black text-gray-200 placeholder-gray-200 shadow-sm text-base focus:outline-none focus:ring-1"
            placeholder="Search Friend"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-1 max-h-36  justify-center items-center overflow-hidden">
        <div className="flex max-w-full max-h-36 flex-col gap-2  overflow-y-auto ">
          {selectedChat?.users?.map((u) => (
            <BadgedUser
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </div>
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
      {searchResult?.slice(0, 4).map((user) => (
        <UserListItem
          key={user._id}
          search_User={user}
          handleFunction={() => selectFrined(user)}
        />
      ))}
    </div>
  );
}
