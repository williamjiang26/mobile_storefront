import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`
      relative overflow-hidden z-10 bg-white
      px-5 py-3 rounded-lg  
      text-slate-500 font-semibold uppercase tracking-wider
      transition-colors duration-300 ease-in-out hover:text-white  
      
      before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10
      before:bg-slate-500 before:scale-x-0 before:origin-left
      before:transition-transform before:duration-300 before:ease-in-out
      hover:before:scale-x-100 ${className}
    `}
    >
      {children}
    </div>
  );
};

export default Button;

const button = () => {
  return (
    <button
      className="
relative overflow-hidden z-10 px-8 py-3 rounded-lg border-2 border-indigo-600
text-indigo-600 font-semibold uppercase tracking-wider bg-transparent
transition-all duration-300 ease-in-out hover:text-white

// Sliding Background Effect
before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10
before:bg-indigo-600 before:scale-x-0 before:origin-left
before:transition-transform before:duration-300 before:ease-in-out
hover:before:scale-x-100

// Text Swap Magic
group
"
    >
      {/* Default Text */}
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-12">
        Hover Me
      </span>

      {/* Hover Text (hidden below, slides up) */}
      <span className="absolute inset-0 flex items-center justify-center translate-y-12 transition-transform duration-300 group-hover:translate-y-0">
        Let's Go!
      </span>
    </button>
  );
};
