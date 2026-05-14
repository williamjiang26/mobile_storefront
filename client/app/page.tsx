"use client";
import { useRouter } from "@/node_modules/next/navigation";
import data from "./data.json";
// import Image from "next/image";
export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen bg-zinc-700">
      <div className="flex flex-row h-10 gap-3 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed - banner*/}
        {/* logo */}
        <div
          className="hover:bg-zinc-200 p-3 hover:rounded-lg"
          onClick={() => router.push("/")}
        >
          logo
        </div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">search box</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">about</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">
          other links
        </div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">guides</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">log in</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">sign up</div>
      </div>
      <div className="flex-1 overflow-y-auto bg-zinc-50 scroll-smooth font-sans dark:bg-black">
        <div className="flex flex-row h-35 gap-10 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
          {/* fixed - categories*/}
          {data["headers"].map((header) => (
            <div className="hover:bg-zinc-200 flex flex-row gap-3 p-3 m-3">
              <div className="rounded-lg aspect-square bg-zinc-50 w-30"> </div>
              <div className="flex items-center">{header}</div>
            </div>
          ))}
          <div
            className="hover:bg-zinc-200 flex flex-row gap-3 p-3 hover:translate-1 h-10"
            onClick={() => router.push("/catalog")}
          >
            <div className="">Explore All</div>
            <div className=" bg-zinc-50 w-10">Arrow</div>
          </div>
        </div>
        {/* scrollable */}
        <div className="flex flex-col h-125  items-center justify-center bg-zinc-200 font-sans dark:bg-black pb-5">
          {/* 1 - shop right away - popular products - glimpse of all categories */}
          <div className="basis-1/6 flex items-center justify-center">
            shop popular products
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["popular products"].slice(0, 5).map((p) => (
              <div className="flex flex-col p-1 w-59 justify-between">
                <div className="rounded-md p-1">
                  <div className="rounded-lg aspect-square bg-zinc-50 p-1">
                    photo
                  </div>
                  <div className="font-semibold p-1">{p["name"]}</div>
                </div>
                <div className="justify-center flex">
                  <div
                    className="w-[80%] mx-auto  h-9 bg-zinc-50 rounded-lg flex items-center justify-center hover:border hover:border-zinc-300"
                    onClick={() => router.push("/checkout")}
                  >
                    Add
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-125 items-center justify-center bg-zinc-300 font-sans dark:bg-black pb-5">
          {/* 2 - best features */}
          <div className="basis-1/6 flex items-center justify-center">
            best features
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["features"].slice(0, 3).map((f) => (
              <div className="flex flex-col p-1 w-59">
                <div className=" rounded-md bg-zinc-200 p-1">
                  <div className="rounded-lg aspect-square bg-zinc-50 p-1">
                    photo
                  </div>
                  <div className="p-1">{f["name"]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-125 w-[80%] mx-auto items-center justify-between bg-zinc-50 pb-20 font-sans dark:bg-black">
          {/* 3 - video and explore button product catalog */}
          <div className="basis-1/6 flex items-center justify-center">
            featured
          </div>
          <div className="bg-zinc-100 w-35 h-12 items-center justify-center flex self-start rounded-md hover:border hover:border-zinc-200">
            <div className="" onClick={() => router.push("/catalog")}>
              Explore
            </div>
          </div>
        </div>
        <div className="flex flex-col h-125 w-[80%] mx-auto items-center justify-between bg-zinc-100 pb-20 font-sans dark:bg-black">
          {/* 4 - Reviews */}
          <div className="basis-1/6 flex items-center justify-center">
            Reviews
          </div>
          <div className="bg-zinc-100 w-35 h-12 items-center justify-center flex self-start rounded-md hover:border hover:border-zinc-200">
            <div className="" onClick={() => router.push("/catalog")}>
              placeholder
            </div>
          </div>
        </div>
        <div className="flex flex-col h-125 w-[80%] mx-auto items-center justify-between bg-zinc-200 pb-20 font-sans dark:bg-black">
          {/* 5 - How to order */}
          <div className="basis-1/6 flex items-center justify-center">
            Process
          </div>
          <div className="bg-zinc-100 w-35 h-12 items-center justify-center flex self-start rounded-md hover:border hover:border-zinc-200">
            <div className="" onClick={() => router.push("/catalog")}>
              placeholder
            </div>
          </div>
        </div>
        {/* other components - reviews  */}
        <div className="flex flex-col h-125  items-center justify-center bg-zinc-500 font-sans dark:bg-black  pb-5">
          footer - socials - contact - locations - warranty and policies - blog
          - site map - payment methods
        </div>
      </div>
    </div>
  );
}
