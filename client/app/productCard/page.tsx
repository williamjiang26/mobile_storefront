import Image from "@/node_modules/next/image";
import React from "react";

//
const c = {
  id: 11,
  img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripe.png",
  pname: "Spicy Beef Tripe",
  description: "chili oil, soy sauce, beef tripe, peanuts, cilantro",
  price: 13,
};
const Page = () => {
  return (
    <div>
      <ProductCard2 /> 
    </div>
  );
};
const ProductCard1 = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="space-y-10 flex flex-col w-[50%] mx-auto  ">
        1.{" "}
        <div className="border rounded-lg flex shadow-sm px-1 h-35">
          <div className="font-semibold text-lg p-1">{c.id}.</div>
          <div className="group rounded-lg cursor-pointer w-35 h-35 p-1 my-auto mx-auto">
            <div className="relative overflow-hidden rounded-lg w-full h-full">
              <Image
                src={c.img}
                alt=""
                fill
                className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center h-fit my-auto w-fit mx-auto">
            <div className="font-semibold">{c.pname}</div>
            <div className="font-light text-xs">{c.description}</div>
          </div>
          <div className="flex items-center ml-auto mr-3 h-fit my-auto">
            {" "}
            {c.price}{" "}
          </div>
        </div>
        2.{" "}
        <div className="shadow-md border rounded-xl flex p-0">
          {/* shadow larger, fontlight on price, fontlight on id, remove background on image and increase padding, space between pname and description, larger price size, increase shadow, rounded-xl */}
          <div className="text-xl p-1 ml-1 font-light mt-0">{c.id}.</div>
          <div className="group cursor-pointer w-35 h-35 p-5 my-auto mx-auto">
            <div className="relative overflow-hidden rounded-xl w-full h-full">
              <Image
                src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out "
              />
            </div>
          </div>
          <div className="mx-auto my-auto space-y-3">
            <div className="font-semibold text-lg">{c.pname}</div>
            <div className="text-sm font-light">{c.description}</div>
          </div>
          <div className="mx-auto my-auto text-lg font-light">{c.price}</div>
        </div>
        3.{" "}
        <div className="shadow-md border rounded-xl h-56 flex p-1">
          <div className="font-semibold text-2xl m-1 ml-1 mt-0">{c.id}.</div>
          <div className="group cursor-pointer w-39 h-39 my-auto mx-auto">
            <div className="relative overflow-hidden rounded-xl w-full h-full">
              <Image
                src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out "
              />
            </div>
          </div>
          <div className="mx-auto my-auto space-y-5">
            <div className="font-semibold text-xl">{c.pname}</div>
            <div className="font-light text-sm">{c.description}</div>
          </div>
          <div className="mx-auto my-auto text-xl font-extralight pl-1">
            {c.price}
          </div>
        </div>
        4.{" "}
        <div className="p-3 shadow-md border rounded-xl h-56 flex">
          <div className="pl-1 text-xl font-semibold">{c.id}.</div>{" "}
          <div className="relative overflow-hidden rounded-xl w-39 h-39 my-auto mx-auto">
            <Image
              src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out "
            />
          </div>
          <div className="mx-auto my-auto space-y-5">
            <div className="text-xl font-semibold">{c.pname}</div>
            <div className="font-light text-sm">{c.description}</div>
          </div>
          <div className="mx-auto my-auto text-xl font-extralight pl-1">
            {c.price}
          </div>
        </div>
        5.{" "}
        <div className="p-3 shadow-md border rounded-xl h-45 flex">
          <div className="pl-1 text-xl font-semibold">{c.id}.</div>
          <div className="relative overflow-hidden rounded-xl w-39 h-39 mx-auto my-auto">
            <Image
              src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out"
            />
          </div>
          <div className="mx-auto my-auto space-y-3">
            <div className="text-xl font-semibold">{c.pname}</div>
            <div className="font-light text-sm">{c.description}</div>
          </div>
          <div className="mx-auto my-auto text-xl font-extralight pl-1">
            {c.price}
          </div>
        </div>
        6.{" "}
        <div className="p-3 shadow-md border rounded-xl h-35 flex">
          <div className="text-xl font-semibold pl-1">{c.id}.</div>
          <div className="relative overflow-hidden rounded-xl w-30 h-30 mx-auto my-auto">
            <Image
              src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
              alt=""
              fill
              className="object-cover transition-transform"
            />
          </div>
          <div className="mx-auto my-auto space-y-1">
            <div className="text-xl font-semibold">{c.pname}</div>
            <div className="font-light text-sm">{c.description}</div>
          </div>
          <div className="mx-auto my-auto text-xl font-extralight pl-1">
            {c.price}
          </div>
        </div>
        7.{" "}
        <div className="p-3 shadow-md group cursor-pointer border rounded-xl h-35 flex">
          <div className="text-xl font-semibold">{c.id}.</div>{" "}
          <div className="w-30 h-30 p-1 my-auto mx-auto">
            <div className="relative overflow-hidden rounded-lg w-full h-full ">
              <Image
                src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-100 scale-110"
              />
            </div>
          </div>
          <div className="mx-auto my-auto space-y-1">
            <div className="font-semibold text-lg">{c.pname}</div>
            <div className="font-light text-sm">{c.description}</div>
          </div>
          <div className="mx-auto my-auto font-extralight text-lg pl-1">
            {c.price}
          </div>
        </div>
        8.
        <div className="shadow-md py-1 border rounded-xl h-27 flex">
          <div className="text-lg pl-3 font-semibold">{c.id}.</div>
          <div className="rounded-xl aspect-square h-full mx-auto my-auto relative overflow-hidden">
            <Image
              src="https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/spicyTripeOg.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="mx-auto my-auto space-y-1 pb-1 pl-1">
            <div className="text-xl font-semibold">{c.pname}</div>
            <div className="text-xs font-light">{c.description}</div>
          </div>
          <div className="mx-auto my-auto font-extralight pb-1 pl-1">
            {c.price}
          </div>
        </div>
        9. <div></div>
        10. <div></div>
      </div>
    </div>
  );
};
const ProductCard2 = () => {
  return (
    <div className="col-span-1 grid grid-cols-1 w-full  pb-1 justify-between bg-zinc-50 shadow-md rounded-lg space-y-3">
      <div className="group rounded-lg cursor-pointer w-full h-59">
        <div className="relative overflow-hidden rounded-lg w-full h-full">
          <Image
            src={p["img"]}
            alt=""
            fill
            className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </div>
      <div className="justify-center flex flex-col">
        <div className="p-1">
          <div className="font-semibold ">{p["name"]}</div>
          <div>Starting at ${p["price"]}</div>
        </div>
        <div
          className="w-[80%] mx-auto flex items-center justify-center  relative overflow-hidden z-10 bg-zinc-50
    h-9 rounded-lg border border-zinc-300 
    text-black tracking-wider
    transition-colors duration-300 ease-in-out hover:text-black  
    
    before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10
    before:bg-zinc-100 before:scale-x-0 before:origin-left
    before:transition-transform before:duration-300 before:ease-in-out
    hover:before:scale-x-100 "
          onClick={() => handleAdd(p)}
        >
          Add
        </div>
      </div>
    </div>
  );
};
export default Page;
