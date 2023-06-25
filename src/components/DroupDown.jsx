import React, { useState } from "react";
import { ChatState } from "../Contex/chatProvider";
import UserListItem from "./UserListItem";
import BadgedUser from "./BadgedUser";

function DroupDown({header , close}) {
  const [search, setSearch] = useState("");

  const [groupchatName,setgroupchatName]=useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { user, chats, setChats, setSelectedChat } = ChatState();

  const handleSulbmit= async()=>{
    if(!groupchatName || !selectedUsers ){
      alert("Please Fill Both Fileds")
      return ;
    }

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
          name: groupchatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        })
      }
      let data = await fetch("http://localhost:4000/api/v1/chat/group", config).then(
      (res) => res.json());
      setChats([data,...chats]);
      setSelectedChat(data)
      close(false)
      
    } catch (error) {
      alert(error);
      return;
    }
  };

  const handleSearch = async (query) => {
    if(!query){
      return ;
    }
    if (!user || !user.accessToken) {
      // Handle the case when user.accessToken is null or undefined
      console.log('Access token not available');
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

  const selectFrined=(friend)=>{
    if (selectedUsers.includes(friend,0)) {
      alert("user already Added!");
    }else{
      setSelectedUsers([...selectedUsers,friend]);
      
    }
    setSearch("");
    
  };
  console.log("Selected UserLIst",selectedUsers);

  const handleDelete=(Deluser)=>{

    setSelectedUsers(selectedUsers.filter((sel)=>sel._id !==Deluser._id));

  }
  return (
    <div className="flex flex-col w-full max-w-md px-4 py-2 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-2 lg:px-10">
      <div className="self-center mb-2 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        {header}
      </div>
      <div>
        <div >
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <input
                type="text"
                className=" rounded-lg flex-1 appearance-none bg-black border border-gray-300 w-full py-2 px-4  text-gray-700 placeholder-gray-200 shadow-sm text-base focus:outline-none focus:ring-1 focus:border-transparent"
                placeholder="Your Group Name"
                onChange={(e)=>setgroupchatName(e.target.value)}
              />
            </div>
          </div>
          {header !== "Rename Group" && <div className="flex items-start mt-2 mb-1">
            <div className="flex ">
              <p
                href="#"
                className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
              >
                Eaxmple (Tom, Jerrey,...)
              </p>
            </div>
          </div>
          }
          {header !== "Rename Group" &&<div className="flex flex-col mb-2">
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
                onChange={(e)=>handleSearch(e.target.value)}
              />
            </div>
          </div>
          }
          <div className="flex mb-1 max-h-36  justify-center items-center overflow-hidden">
            <div className="flex max-w-full max-h-36 flex-col gap-2  overflow-y-auto ">

              {selectedUsers?.map((u)=>(<BadgedUser key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>))}
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
        </div>
      </div>
      {searchResult?.slice(0,2).map((user)=>(<UserListItem key={user._id} search_User={user} handleFunction={() => selectFrined(user)}/>))}
      {/* <div className="flex items-center justify-center mt-6">
        <a
          href="#"
          target="_blank"
          className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
        >
          <span className="ml-2">You don&#x27;t have an account?</span>
        </a>
      </div>*/}
    </div> 
  );
}

export default DroupDown;
