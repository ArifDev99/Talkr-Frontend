import React from "react";

function BadgedUser({user ,handleFunction}) {
    // console.log(user);
  return (
    <div>

        <span className=" flex gap-2 items-center px-4 py-1  text-sm text-center rounded-full text-white  bg-indigo-500 " >
            <span>{user?.firstname}</span>
            <button className="bg-transparent " onClick={handleFunction}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className=" w-4 h-4  "
                viewBox="0 0 1792 1792"
                >
                <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                </svg>
            </button>
        </span>
    </div>
  );
}

export default BadgedUser;
