import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import Authchecker from "../common/Authchecker";
import { ChatState } from "../Contex/chatProvider";
import { getSenderName } from "./utils/chatLogis";

export default function Navbar() {
  const { user, notification, setNotification, setSelectedChat } = ChatState();

  const [showmenu, setShowmenu] = useState(false);
  const [showNotificationList, setshowNotificationList] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "http://127.0.0.1:5173/";
  };

  return (
    <div className="sticky top-0 flex h-14 justify-between ietms-center p-2 bg-gray-600 mb-2">
      <NavLink to="/" end>
        <img className="w-10 h-10  rounded-lg " src={logo} alt="" />
      </NavLink>
      <p className="items-center text-2xl py-1 md:text-xl">Chat App</p>
      <div className=" flex items-center gap-2">
        <button
          className="relative w-8 h-8 rounded-lg flex justify-center items-center border-0 bg-gray-900 hover:bg-gray-500 "
          onClick={() => setshowNotificationList(!showNotificationList)}
        >
          {notification.length !==0 &&<span class="absolute w-4 h-4 text-xs bg-red-500 rounded-full right-0 top-0 leading">
            {notification.length}
          </span>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.2rem"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
          </svg>
        </button>
        {showNotificationList && (
          <div className="absolute cursor-pointer right-20 top-12 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
            <div
              className="py-1 "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {!notification.length && (
                <div className="block  px-4 py-1  border-b-2  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 rounded-md dark:hover:text-white dark:hover:bg-gray-600">
                  No Notification to show
                </div>
              )}
              {notification.map((noti) => (
                <div
                  key={noti._id}
                  onClick={() => {
                    setSelectedChat(noti.chat);
                    setNotification(notification.filter((n) => n !== noti));
                  }}
                  className="block  px-4 py-1  border-b-2  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 rounded-md dark:hover:text-white dark:hover:bg-gray-600"
                >
                  {noti.chat.isGroupChat
                    ? `New Message in ${noti.chat.chatName}`
                    : `New Message from ${getSenderName(
                        user,
                        noti.chat.users
                      )}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {user ? (
          <div className="relative inline-block text-left">
            <div className=" border border-gray-300  dark:bg-gray-800 shadow-sm flex items-center justify-center w-full rounded-md  px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
              <button
                type="button"
                className=" flex items-center justify-center"
                id="options-menu"
                onClick={() => setShowmenu(!showmenu)}
              >
                <img
                  className=" w-8 h-8 rounded-full object-cover mx-2"
                  src={user?.profile}
                  alt="profile image"
                  srcSet=""
                />
                {user.firstname}
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
            {showmenu && (
              <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1 "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <NavLink className="block  px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                    Profile
                  </NavLink>
                  <NavLink
                    className="block  px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    onClick={handleLogout}
                  >
                    Log Out
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <NavLink
              to="/signup"
              className=" text-white bg-black border border-sky-500 rounded-lg p-2 hover:bg-sky-500 hover:text-white md:p-1 "
            >
              Sign up
            </NavLink>
            <NavLink
              to="/signin"
              className=" text-white bg-black border border-sky-500 rounded-lg p-2 hover:bg-sky-500 hover:text-white md:p-1"
            >
              Log IN
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
