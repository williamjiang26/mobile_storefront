"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { motion } from "motion/react";
import { fetchMyProducts } from "../actions/products";
//
interface LineItem {
  price: string;
  quantity: number;
}
//
const Catalog = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [productType, setType] = useState("Made-To-Order");
  fetchMyProducts(setProducts);
  const handleAdd = (p) => {
    const serializedItems = encodeURIComponent(JSON.stringify(p));
    router.push(`/order?items=${serializedItems}`);
    return;
  };
  const handleCheckout = (p) => {
    const serializedItems = encodeURIComponent(JSON.stringify(p));
    router.push(`/checkout?items=${serializedItems}`);
    return;
  };
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {/* toggle */}
      <div className="mt-28 flex py-1 gap-5 font-sans dark:bg-black overflow-x-scroll overflow-x-auto ">
        {/* fixed - two options */}
        {[
          "Made-To-Order",
          "Stock",
          "Made-To-Order",
          "Stock",
          "Made-To-Order",
          "Stock",
        ].map((c, index) => (
          <div
            key={index}
            className={`border shrink-0 rounded-lg px-2 py-3 m-1 flex items-center gap-3 cursor-pointer select-none transition-all ${
              productType === c
                ? "underline underline-offset-3"
                : "hover:bg-zinc-200"
            } hover:underline hover:underline-offset-3`}
            onClick={() => setType(c)}
          >
            <div className="relative aspect-square h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-300 dark:bg-zinc-700">
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            <div>{c}</div>
          </div>
        ))}
      </div>
      {/* catalog */}
      <div className="grid w-full 5xl:w-[80%] 5xl:mx-auto grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 5xl:grid-cols-7 p-5 scroll-smooth font-sans dark:bg-black gap-10 overflow-y-auto">
        {/* made to order */}
        {productType === "Made-To-Order" &&
          products
            .filter((p) => !p.stock)
            .map((p) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="col-span-1 grid grid-cols-1 w-full h-full pb-1 justify-between bg-zinc-50 shadow-md rounded-lg space-y-3">
                  <div className="group rounded-lg cursor-pointer w-full h-96">
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
              </motion.div>
            ))}

        {/* stock */}
        {productType === "Stock" &&
          products
            .filter((p) => p.stock)
            .map((p) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="col-span-1 grid grid-cols-1 w-full h-full pb-1 justify-between bg-zinc-50 shadow-md rounded-lg space-y-3">
                  <div className="group rounded-lg cursor-pointer w-full h-96">
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
                      <div>${p["price"]}</div>
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
                      onClick={() => handleCheckout(p)}
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
