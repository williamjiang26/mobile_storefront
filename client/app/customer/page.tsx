import React from "react";
import Header from "../components/header";

const Page = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto mt-30">
        <div className="border rounded-lg mx-auto px-5 py-3 flex justify-center w-[90%]">
          <div className="flex flex-col">
            <div>User</div> <div>100 points</div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 w-[90%] mx-auto py-4">
          {[
            "Leave a review +10 points",
            "+10 points",
            "+10 points",
            "+10 points",
            "+10 points",
          ].map((c) => (
            <div className="border rounded-lg w-full px-5 py-3">{c}</div>
          ))}
        </div>
      </main>
      {/* bottom buttons */}
      <nav className="w-full bg-white border-t border-gray-200 pb-safe shadow-lg">
        <div className="w-[90%] mx-auto flex justify-between items-center py-3">
          {/* Navigation Links / Icons */}
          <button className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600 font-medium">
            <span> </span>
            <span>Rewards</span>
          </button>{" "}
          <button className="flex flex-col items-center text-sm text-blue-600 font-medium">
            <span>🏠</span>
            <span>Home</span>
          </button>
          <button className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600 font-medium">
            <span> </span>
            <span>Orders</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Page;
