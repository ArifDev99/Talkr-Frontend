// import { useContext } from 'react';
// import UserContext from './UserContext';

import { ChatState } from "../Contex/chatProvider";

const Authchecker = () => {
  const user=JSON.parse(localStorage.getItem("userInfo"));
  // Add your authentication logic here
  // For example, if you have a user object with a property indicating authentication status
  // you can check if the user is logged in based on that property
  if (user?.accessToken){
    return true
  }

  return false;
};

export default Authchecker;

