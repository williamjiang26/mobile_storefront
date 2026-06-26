import React from "react";
import Header from "@/app/components/header";
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
      <div className="mt-27 h-screen w-[90%] mx-auto rounded-lg flex justify-center ">
        <div className="flex flex-col ">
          <div className="h-[25vh] my-auto">
            <div className="relative overflow-hidden rounded-lg aspect-square  mr-5   ">
              <Image
                src={c["img"]}
                alt=""
                fill
                className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
              />
            </div>
          </div>
          <div className="h-[15vh]">description</div>
          <div className="h-[15vh]">
            <div className="text-center border rounded-lg">redeem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
