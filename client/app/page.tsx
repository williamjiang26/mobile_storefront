"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import data from "./data.json";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect } from "react";
// import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(null);
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div className="flex flex-col bg-slate-50">
      {/* fixed - banner - */}
      {/* logo */}
      <motion.header
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex fixed top-10 inset-x-0 z-50 mx-auto w-[80%] rounded-lg border bg-white/80 backdrop-blur justify-between"
      >
        <div
          className="hover:bg-zinc-200 p-6 hover:rounded-lg"
          onClick={() => router.push("/")}
        >
          logo
        </div>
        <div className="flex justify-between">
          <div className="relative p-3">
            <div className="hover:bg-zinc-200 hover:rounded-lg p-3">
              About
            </div>
          </div>
          <div
            className="relative p-3"
            onMouseEnter={() => setOpen("links")}
            onMouseLeave={() => setOpen(null)}
          >
            <div className="hover:bg-zinc-200 hover:rounded-lg p-3">
              other links
            </div>

            <AnimatePresence>
              {open === "links" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-2 w-56 rounded-lg border bg-white shadow-lg"
                >
                  <div className="p-3 hover:bg-zinc-100 rounded-lg">
                    refund policy
                  </div>
                  <div className="p-3 hover:bg-zinc-100">warranty</div>
                  <div className="p-3 hover:bg-zinc-100 rounded-lg">
                    terms and agreements
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className="relative p-3"
            onMouseEnter={() => setOpen("guides")}
            onMouseLeave={() => setOpen(null)}
          >
            <div className="hover:bg-zinc-200 hover:rounded-lg p-3">guides</div>

            <AnimatePresence>
              {open === "guides" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-2 w-56 rounded-lg border bg-white shadow-lg"
                >
                  <div className="p-3 hover:bg-zinc-100 rounded-lg">
                    product selection guide
                  </div>
                  <div className="p-3 hover:bg-zinc-100">delivery guide</div>
                  <div className="p-3 hover:bg-zinc-100 rounded-lg">
                    maintenance guide
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative p-3">
            <div className="hover:bg-zinc-200 hover:rounded-lg p-3">
              Log in
            </div>
          </div> <div className="relative p-3">
            <div className="hover:bg-zinc-200 hover:rounded-lg p-3">
             Sign up
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 overflow-y-auto bg-zinc-50 scroll-smooth font-sans dark:bg-black">
        <div className="flex flex-row w-[80%] mx-auto h-35 justify-between font-sans dark:bg-black">
          {/* fixed - categories - if width shrinks put title underneath*/}
          {/* {data["headers"].map((header) => (
            <div className="hover:bg-zinc-200 flex flex-row gap-3 p-3 m-3 w-30">
              <div className="rounded-lg aspect-square bg-zinc-100 p-1 "> </div>
              <div className="flex items-center">{header}</div>
            </div>
          ))}
          <div
            className="hover:bg-zinc-200 flex flex-row gap-3 p-3 hover:translate-1 items-center"
            onClick={() => router.push("/catalog")}
          >
            <div className="">Explore All</div>
            <div className=" bg-zinc-50 w-10">Arrow</div>
          </div> */}
        </div>
        {/* scrollable */}
        <div className="flex flex-col h-125  items-center justify-center bg-zinc-50 font-sans dark:bg-black pb-5">
          {/* 1 - shop right away - popular products - glimpse of all categories */}
          <div className="basis-1/6 flex items-center justify-center">
            Shop popular products
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["popular products"].slice(0, 5).map((p) => (
              <div className="flex flex-col p-1 w-59 justify-between shadow-lg m-1 rounded-lg ">
                <div className="   flex-col rounded-md p-1">
                  <div className="rounded-lg relative aspect-square justify-center flex bg-zinc-50 p-1 overflow-hidden w-50">
                    {p.url && (
                      <Image
                        src={p.url || "/placeholder.png"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="font-semibold p-1">{p["name"]}</div>
                  <div className="p-1">from {p["start price"]}</div>
                </div>
                <div className="justify-center flex p-3">
                  <div
                    className="w-[80%] mx-auto  h-9 bg-zinc-50 rounded-lg hover:shadow-md flex items-center justify-center border border-zinc-200"
                    onClick={() => router.push("/checkout")}
                  >
                    Add
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-125  items-center justify-center bg-zinc-50 font-sans dark:bg-black pb-5">
          {/* 1 - shop right away - products in stock - glimpse of all categories */}
          <div className="basis-1/6 flex items-center justify-center">
            Products in stock ~ ships in 2-3 weeks
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["products in stock"].slice(0, 5).map((p) => (
              <div className="flex flex-col p-1 w-59 justify-between shadow-lg m-1 rounded-lg ">
                <div className="   flex-col rounded-md p-1">
                  <div className="rounded-lg relative aspect-square justify-center flex bg-zinc-50 p-1 overflow-hidden w-50">
                    {p.url && (
                      <Image
                        src={p.url || "/placeholder.png"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="font-semibold p-1">{p["name"]}</div>
                  <div className=" p-1">{p["description"]}</div>
                  <div className=" p-1">{p["price"]}</div>
                </div>
                <div className="justify-center flex p-3">
                  <div
                    className="w-[80%] mx-auto h-9 bg-zinc-50 rounded-lg hover:shadow-lg flex items-center justify-center border border-zinc-200"
                    onClick={() => router.push("/checkout")}
                  >
                    Checkout
                  </div>
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
        <div className="flex flex-col h-125 items-center justify-center bg-zinc-300 font-sans dark:bg-black pb-5">
          {/* 2 - best features - animated scroll*/}
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
