import Header from "@/app/components/header";
import React from "react";
import Image from "next/image";

const Page = () => {
  const c = {
    itemName: "Burrito ",
    points: "10",
    img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
  };
  return (
    <div className="max-h-screen w-full flex flex-col">
      <Header />
      <div className="mt-27 h-screen w-[90%] mx-auto rounded-lg">
        <div className="h-25 flex flex-col">
          <div className="text-xl font-light"> # 16000</div>
          <div className="text-sm">9/25/24</div>
        </div>
        <div className="h-[50vh] flex flex-col">
          <div className="rounded-lg w-full h-56 flex justify-between items-center">
            <div className="relative overflow-hidden rounded-lg aspect-square w-15  mr-5">
              <Image
                src={c["img"]}
                alt=""
                fill
                className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
              />
            </div>
            <div className=" ">{c.itemName}</div>
            <div className="flex ml-auto"> {c.points}</div>
          </div>
          <div className="flex ml-auto justify-between">
            <div className=" ">total </div>
            <div className="ml-10"> {c.points}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="border rounded-lg p-1 flex w-56 justify-between">
            <div className=" ">leave a review </div>
            <div className=" ">+ 10 points </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
