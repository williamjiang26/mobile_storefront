import React from "react";
import blogs from "../blog.json";
import Footer from "../components/footer";
import Header from "../components/header";
//
//
//
const Page = () => {
  const blog = blogs["blogs"][2];
  return (
    <div>
      <div className="flex flex-col justify-center h-screen items-center ">
        <Header />
        <div className="flex flex-col w-[90%] mx-auto space-y-1">
          <div>{blog["date"]}</div>
          <div className="text-lg ">{blog["title"]}</div>
          <div>{blog["article"]}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
