import React, { useState } from "react";
import { ChatState } from "../Contex/chatProvider";
// import UserListItem from "./UserListItem";
import Sidedrawer from "./Search";
import DroupDown from "./DroupDown";
import Search from "./Search";
import SideDrawer from "./Sidedrawer";


export default function Profile() {
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  const [showSidedrawer, setShowSideDrawer] = useState(false);
  const [showCreateGroup, setCreateGroup] = useState(false);
  const [showRenameGroup, setRenameGroup] = useState(false);

  const { user, chats, setChats, setSelectedChat } = ChatState();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // const handleSearch = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.accessToken}`,
  //       },
  //     };

  //     const fetchdata = await fetch(
  //       `http://localhost:4000/api/v1/user?search=${search}`,
  //       config
  //     ).then((res) => res.json());
  //     setSearchResult(fetchdata);
  //     console.log(fetchdata);
  //   } catch (error) {
  //     alert("Cannot fetch");
  //   }
  // };

  // const accessChat = async (userId) => {
  //   console.log(userId);
  //   const config = {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${user.accessToken}`,
  //     },
  //     body: JSON.stringify({ userid: userId }),
  //   };

  //   let data = await fetch("http://localhost:4000/api/v1/chat/", config).then(
  //     (res) => res.json()
  //   );
  //   if (!chats.find((c) => c._id === data._id)) {
  //     setChats([data, ...chats]);
  //   }
  //   setSelectedChat(data);
  //   console.log(data);
  // };

  return (
    <div className="flex justify-center  ml-0.5 w-full h-full overflow-hidden">
      {/* {!showSidedrawer ? */}
      <div className="p-2 flex cursor-pointer flex-col  w-full h-full border border-gray-200 rounded-lg shadow bg-primary-dark  overflow-y-auto">
        {/* <div className=" mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className=" m-0 -mr-0.5 block w-[1px] bg-black min-w-0 flex-auto rounded-l border border-solid border-neutral-300  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600  dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
            onChange={(e)=>setSearch(e.target.value)}
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
          
        </div> */}
        <div
          className="my-1 py-2 px-4 gap-2 flex justify-center items-center bg-dark hover:bg-light-blue-1 text-white  transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  rounded-lg "
          onClick={openDrawer}
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
          <p className="md:hidden">Search</p>
        </div>
        <SideDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
          {/* Content of the side drawer */}
          <Search />
        </SideDrawer>

        <div
          className="py-2 my-1 gap-2 px-4 flex justify-center items-center bg-dark hover:bg-light-blue-1  text-white  transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  rounded-lg  "
          onClick={() => setCreateGroup(!showCreateGroup)}
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <p className="md:hidden">Create Group Chat</p>
        </div>
        {showCreateGroup && (
          <DroupDown header={"Create Group"} close={setCreateGroup} />
        )}
        <div className="py-2 my-1 gap-2 px-4 flex justify-center items-center bg-dark hover:bg-light-blue-1  text-white  transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  rounded-lg ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.2em"
            className="ml-2"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
          </svg>
          <p className="md:hidden">Rename Group</p>
        </div>
        {/* {showRenameGroup && <DroupDown header={"Rename Group"} />} */}
        {/* <div className="py-2 my-1 px-4 flex justify-center items-center bg-gray-800 hover:bg-gray-500 focus:bg-neutral-900  text-white  transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  rounded-lg ">
          Search
        </div> */}

        <div className="hidden px-4 pt-4 ">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="#"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Visual Designer
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add friend
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Message
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* (<Search showSidedrawer={showSidedrawer} setShowSideDrawer={setShowSideDrawer}/>)} */}
    </div>
  );
}
