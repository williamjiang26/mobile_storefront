import React from "react";
import Header from "@/app/components/header";
import Image from "next/image";

const Page = () => {
  const c = {
    itemName: "Burrito ",
    description: "wrapped tortilla ",
    points: "10",
    img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
  };
  return (
    <div className="max-h-screen w-full flex flex-col">
      <Header />
      <div className="mt-27 h-screen w-[80%] mx-auto rounded-lg">
        <div className="flex flex-col">
          <div className="h-[50vh] w-[50%] mx-auto flex items-center justify-center">
            <div className="relative overflow-hidden rounded-lg aspect-square h-15 mr-5 w-15  ">
              <Image
                src={c["img"]}
                alt=""
                fill
                className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
              />
            </div>
          </div>
          <div className="h-[15vh] w-[70%] mx-auto flex flex-col">
            <div className="text-xl ">{c["itemName"]}</div>
            <div className="font-light ">{c["description"]}</div>
            <div>{c["points"]} points</div>
          </div>
          <div className="h-[15vh] w-[50%] mx-auto  ">
            <div className="text-center border rounded-lg py-1 relative overflow-hidden z-10
            
            transition-colors duration-300 ease-in-out hover:text-white tracking-wider
            before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10
             before:bg-zinc-100 before:scale-x-0 before:origin-left
            before:transition-transform before:duration-300 before:ease-in-out
            hover:before:scale-x-100">redeem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
