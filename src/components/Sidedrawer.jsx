import React from 'react';


const SideDrawer = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-16 flex items-center justify-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      <div className="fixed p-2 inset-y-0 top-16 right-0 w-[20%] bg-gray-800 shadow-sm rounded-lg">
        <div className="flex  w-full mb-2 justify-end ">
            <button
                className="  text-3xl text-white items-center cursor-pointer  "
                onClick={onClose}
            >
                x
            </button>
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
};



export default SideDrawer;
