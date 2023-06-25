// import {getSenderName} from "../utils/chatLogis"

import React, { useState } from "react";
import { ChatState } from "../../Contex/chatProvider";
import { getSenderName } from "../utils/chatLogis";
import SideDrawer from "../Sidedrawer";
import DroupDown from "../DroupDown";
import RenameGr from "./RenameGr";
import AddUserGroup from "../AddUserGroup";
// import Sidedrawer from "../Search";

function Chatbar({fetchAgain, setFetchAgain,showMychats}) {
  const [showSidedrawer, setShowSideDrawer] = useState(false);
  const { loggedUser, selectedChat } = ChatState();

  const [isRenameGrOpen, setIsRenameGrOpen] = useState(false);
  const [isAddUserGroupOpen, setIsAddUserGroupOpen] = useState(false);

  const openRenameGr = () => {
    setIsRenameGrOpen(true);
  };

  const openAddUserGroup = () => {
    setIsAddUserGroupOpen(true);
  };

  const closeDrawer = () => {
    setIsRenameGrOpen(false);
    setIsAddUserGroupOpen(false);
  };




  return (
    <div className="flex w-full bg-black p-2 rounded-t-md">
      <div className="flex w-full justify-between  px-2">
        <div className="w-[50%] flex md:justify-around  ">
          <button className="hidden sm:flex px-1" onClick={showMychats}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5rem"
              fill="currentColor"
              viewBox="0 0 512 512"
              className="hidden md:flex"
            >
              <path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z" />
            </svg>
          </button>

          {selectedChat && (
            <p className="text-xl">
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : getSenderName(loggedUser, selectedChat.users)}
            </p>
          )}
        </div>
        {!selectedChat?.isGroupChat ? (
          <button>
            <svg
              fill="currentColor"
              height="1.5rem"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
            </svg>
          </button>
        ) : (
          <div className="flex gap-3">
              <button onClick={openRenameGr}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            </button>
            <SideDrawer isOpen={isRenameGrOpen} onClose={closeDrawer}>
              {/* Content of the side drawer */}
              {/* <DroupDown /> */}
              <RenameGr fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </SideDrawer>
            <button onClick={openAddUserGroup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2rem"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
            </button>
            <SideDrawer isOpen={isAddUserGroupOpen} onClose={closeDrawer}>
              {/* Content of the side drawer */}
              {/* <DroupDown /> */}
              <AddUserGroup fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
            </SideDrawer>
          </div>
        )}
      </div>
      {/* {showSidedrawer && <Sidedrawer/>} */}
    </div>
  );
}

export default Chatbar;
