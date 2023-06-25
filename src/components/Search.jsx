import React, { useState } from "react";
import { ChatState } from "../Contex/chatProvider";
import UserListItem from "./UserListItem";

export default function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user, chats, setChats, setSelectedChat } = ChatState();

  const handleSearch = async () => {

    if (!user || !user.accessToken) {
      // Handle the case when user.accessToken is null or undefined
      console.log('Access token not available');
      return;
    }
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

  const accessChat = async (userId) => {
    if (!user || !user.accessToken) {
      // Handle the case when user.accessToken is null or undefined
      console.log('Access token not available');
      return;
    }
    console.log(userId);
    try {
      
      const config = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ userid: userId }),
      };
  
      let data = await fetch("http://localhost:4000/api/v1/chat/", config).then(
        (res) => res.json()
      );
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className={` w-full bg-gray-800 rounded-lg  p-2  text-white  h-full`}>
      <div className=" mb-4 flex ">
        <input
          type="search"
          className=" m-0 -mr-0.5 block w-[1px] bg-black min-w-0 flex-auto rounded-l border border-solid border-neutral-300  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600  dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="  flex items-center rounded-r bg-primary px-2 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-lg  focus:shadow-lg focus:outline-none "
          type="button"
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col text-white">
        {searchResult?.map((search_User) => (
          <UserListItem
            key={search_User._id}
            search_User={search_User}
            handleFunction={() => accessChat(search_User._id)}
          />
        ))}
      </div>
    </div>
  );
}
