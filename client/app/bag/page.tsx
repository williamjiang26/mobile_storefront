"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Header from "../components/header";

import Nav from "../components/nav";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const sampleDescription = [
    "fresh-squeezed",
    "30% sugar",
    "30% ice",
    "medium",
    "to-go",
  ];
  const c = {
    itemName: "Burrito ",
    points: "10  ",
    img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
  };
  return (
    <div className="flex flex-col max-h-screen ">
      <Header />
      <div className="mt-28 shadow-sm relative overflow-hidden rounded-lg mx-auto h-25 px-5 py-3 flex justify-center w-[90%] ">
        <div className="flex flex-col items-center justify-between">
          <Image
            src={
              "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png"
            }
            alt=""
            fill
            className="object-cover scale-110  transition-transform duration-500 ease-out group-hover:scale-100"
          />
          <div className="z-15 my-auto">Bag</div>
        </div>
      </div>
      <div className="pt-5 space-y-3 overflow-y-auto flex-auto h-screen w-[90%] mx-auto">
        {[1, 2, 3].map((p, index) => (
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
            <div className="w-full">
              <div className="text-lg">{c.itemName}</div>
              <div className="text-xs">{sampleDescription}</div>
            </div>
            <div className="text-center px-3"> {c.points}</div>
            <div className="flex justify-between space-x-1">
              <div className="border rounded-lg p-1">edit</div>
              <div className="border rounded-lg p-1">checkout</div>
            </div>
          </div>
        ))}
      </div>
      <Nav />
    </div>
  );
};

export default Page;
