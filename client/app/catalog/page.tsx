"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import data from "../data.json";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "motion/react";
interface LineItem {
  price: string;
  quantity: number;
}
const Catalog = () => {
  const router = useRouter();
  const [productType, setType] = useState("made-to-order");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const handleAdd = (price: string) => {
    const newItems = [{ price, quantity: 1 }];
    const serializedItems = encodeURIComponent(JSON.stringify(newItems));
    router.push(`/order?items=${serializedItems}`); // if (!response.ok)
    return;
  };
  const handleCheckout = (price: string) => {
    const newItems = [{ price, quantity: 1 }];
    const serializedItems = encodeURIComponent(JSON.stringify(newItems));
    router.push(`/checkout?items=${serializedItems}`); // if (!response.ok)
    return;
  };
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />
      {/* toggle */}
      <div className="mt-30 flex flex-row p-1 gap-10 items-center justify-center font-sans dark:bg-black">
        {/* fixed - two options */}
        <div
          className={`   rounded-lg px-5 py-3 flex ${
            productType === "made-to-order"
              ? "underline underline-offset-3"
              : "hover:bg-zinc-200"
          }   hover:underline hover:underline-offset-3`}
          onClick={() => setType("made-to-order")}
        >
          Made-To-Order
        </div>
        <div
          className={`   rounded-lg px-5 py-3 flex ${
            productType === "stock"
              ? "underline underline-offset-3"
              : "hover:bg-zinc-200"
          }  hover:underline hover:underline-offset-3`}
          onClick={() => setType("stock")}
        >
          Stock
        </div>
      </div>
      {/* catalog */}
      <div className="grid w-full h-screen sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-7 p-5 scroll-smooth font-sans dark:bg-black gap-10">
        {/* made to order */}
        {productType === "made-to-order" &&
          data["popular products"].map((p) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex flex-col pb-1 h-125 w-75   justify-between bg-zinc-50 shadow-md rounded-lg space-y-3">
                <div className="group rounded-lg  cursor-pointer h-full w-full">
                  <div className="relative overflow-hidden rounded-lg h-full w-full ">
                    <Image
                      src={p["url"]}
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
                    <div>Starting at {p["start amount"]}</div>
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
                    onClick={() => handleAdd(p["price"])}
                  >
                    Add
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        {/* stock */}
        {productType === "stock" &&
          data["products in stock"].map((p) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex flex-col pb-1 h-125 w-75   justify-between bg-zinc-50 shadow-md rounded-lg space-y-3">
                <div className="group rounded-lg  cursor-pointer h-full w-full">
                  <div className="relative overflow-hidden rounded-lg h-full w-full ">
                    <Image
                      src={p["url"]}
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
                    <div>{p["amount"]}</div>
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
                    onClick={() => handleCheckout(p["price"])}
                  >
                    Checkout
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
