"use client";
import Image from "next/image";
import Header from "../../components/header";

import BottomNav from "../../components/bottomNav";
import { useRouter } from "@/node_modules/next/navigation";
import { fetchCustomer } from "@/app/actions/customers";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  // get rewards and account information
  const [customer, setCustomer] = useState({
    accountInformation: {
      email: "new@gmail.com",
    },
    shoppingCart: [],
    orders: [],
  });
  // get customer orders
  const rewards = [
    {
      itemName: "yogurt",
      img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/images.jpg",
      points: "5",
    },
    {
      itemName: "honey water",
      img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/550px-nowatermark-Make-Honey-Water-Step-4-Version-2.jpg",
      points: "5",
    },
    {
      itemName: "green juice",
      img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/download-1.jpg",
      points: "5",
    },
  ];
  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const customerData = await fetchCustomer();
        if (customerData) {
          setCustomer(customerData);
        }
      } catch (error) {
        console.error("Failed to load customer profile data:", error);
      }
    };
    loadCustomer();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto mt-27">
        <div className="shadow-sm relative overflow-hidden rounded-lg mx-auto h-25 px-5 py-3 flex justify-center w-[90%] ">
          <div className="flex flex-col items-center justify-between">
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png"
              }
              alt=""
              fill
              className="object-cover scale-110  transition-transform duration-500 ease-out group-hover:scale-100"
            />
            <div className="z-15 my-auto">
              {customer?.accountInformation.email}
            </div>
            <div className="z-10 text-sm flex">
              balance: <b>100</b> points
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 w-[90%] mx-auto py-3">
          {rewards.map((c:any, index) => (
            <div key={index} className="shadow-md py-1 border rounded-xl h-27 flex px-1 w-full">
              <div className="rounded-xl aspect-square h-full mx-auto my-auto relative overflow-hidden">
                <Image
                  src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mx-auto my-auto space-y-1 pb-1 pl-1 w-[50%] border">
                <div className="text-xl font-semibold">{c.itemName}</div>
                <div className="text-xs font-light">{c.description}</div>
              </div>
              <div className="mx-auto my-auto font-extralight pb-1 pl-1 w-[10%] border">
                {c.points}
              </div>
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
