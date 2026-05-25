import React from "react";

const Button = ({ children }) => {
  return (
    <div
      className="
      relative overflow-hidden z-10 bg-white
      px-5 py-3 rounded-lg  
      text-yellow-600 font-semibold uppercase tracking-wider
      transition-colors duration-300 ease-in-out hover:text-white
      
      before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10
      before:bg-yellow-600 before:scale-x-0 before:origin-left
      before:transition-transform before:duration-300 before:ease-in-out
      hover:before:scale-x-100
    "
    >
      {children}
    </div>
  );
};

export default Button;
