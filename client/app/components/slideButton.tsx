import React from "react";

const Button = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [x: string]: any;
}) => {
  return (
    <button
      {...props}
      className={`
      relative overflow-hidden z-10 bg-white
      px-5 py-3 rounded-lg  
      text-slate-500 font-semibold uppercase tracking-wider
      transition-colors duration-300 ease-in-out 
      active:text-white lg:hover:text-white  
      
      before:absolute before:inset-0 before:-z-10
      before:bg-slate-500 before:scale-x-0 before:origin-left
      before:transition-transform before:duration-300 before:ease-in-out
      active:before:scale-x-100 lg:hover:before:scale-x-100 ${className}
    `}
    >
      {children}
    </button>
  );
};

export default Button;
