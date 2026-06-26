"use client";
import React from "react";
import Header from "../../components/header";

import Image from "next/image";
import BottomNav from "../../components/bottomNav";
import { useRouter } from "@/node_modules/next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto mt-27">
        <div className="shadow-sm rounded-lg mx-auto h-25 px-5 py-3 flex justify-center w-[90%]">
          <div className="flex flex-col items-center">
            {/* <div>Username</div> <div>100 points</div> */}
          </div>
        </div>
        {/* <div className="flex flex-col space-y-1 w-[90%] mx-auto py-3">
          {[{ itemName: "Leave a review", points: "+10 points" }].map((c) => (
            <div className="border rounded-lg w-full px-5 py-3 flex justify-between">
              <div>{c.itemName}</div>
              <div>{c.points}</div>
            </div>
          ))}
        </div> */}
        <div className="flex flex-col space-y-1 w-[90%] mx-auto py-3">
          {[
            {
              itemName: "Burrito ",
              points: "10 points",
              img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
            },
            {
              itemName: "Burrito Bowl",
              points: "10 points",
              img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
            },
            {
              itemName: "Quesadilla",
              points: "10 points",
              img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
            },
            {
              itemName: "Tacos ",
              points: "10 points",
              img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
            },
            {
              itemName: "Salad",
              points: "10 points",
              img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
            },
          ].map((c, index) => (
            <div
              key={index}
              className="border rounded-lg w-full flex justify-between items-center p-3"
              onClick={() => {
                router.push(`/customer/rewards/itemName=${c.itemName}`);
              }}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square w-56 mr-5">
                <Image
                  src={c["img"]}
                  alt=""
                  fill
                  className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                />
              </div>
              <div className="w-full">{c.itemName}</div>
              <div className="w-full"> {c.points}</div>
            </div>
          ))}
        </div>
      </main>
      {/* bottom buttons */}
      <BottomNav />
    </div>
  );
};

export default Page;
