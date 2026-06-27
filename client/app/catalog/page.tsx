"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";

import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { motion } from "motion/react";
import { client, GET_PRODUCTS_QUERY } from "../actions/products";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Warehouse, NotebookPen } from "lucide-react";
import NavPage from "../components/nav";

const Catalog = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [productType, setType] = useState("Made-To-Order");
  const fetchMyProducts = async () => {
    try {
      const response = await client.query({
        query: GET_PRODUCTS_QUERY,
        fetchPolicy: "network-only",
      });
      setProducts((response.data as any).products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchMyProducts();
  const handleAdd = (p: any) => {
    const serializedItems = encodeURIComponent(JSON.stringify(p));
    router.push(`/order?items=${serializedItems}`);
    return;
  };
  const handleCheckout = (p: any) => {
    const serializedItems = encodeURIComponent(JSON.stringify(p));
    router.push(`/checkout?items=${serializedItems}`);
    return;
  };
  const [sliderRef] = useKeenSlider({
    mode: "free",
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 650px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(min-width: 1023px)": {
        slides: { perView: 5, spacing: 15 },
      },
    },
  });
  return (
    <div className="flex flex-col max-h-screen w-full 2xl:w-[80%] 2xl:mx-auto">
      <Header />
      {/* toggle */}
      <div ref={sliderRef} className="keen-slider mt-19 py-3 sm:mt-30 px-3">
        {[
          {
            productType: "Made-To-Order",
            img: <NotebookPen className="absolute top-3 left-3" />,
          },
          {
            productType: "Stock",
            img: <Warehouse className="absolute top-3 left-3" />,
          },
          {
            productType: "Made-To-Order",
            img: <NotebookPen className="absolute top-3 left-3" />,
          },
          {
            productType: "Stock",
            img: <Warehouse className="absolute top-3 left-3" />,
          },
          {
            productType: "Made-To-Order",
            img: <NotebookPen className="absolute top-3 left-3" />,
          },
          {
            productType: "Stock",
            img: <Warehouse className="absolute top-3 left-3" />,
          },
        ].map((c, index) => (
          <div
            key={index}
            className={`keen-slider__slide border shrink-0 rounded-lg px-2 py-3 m-1 w-[80%] mx-auto flex items-center justify-between gap-3 cursor-pointer select-none transition-all ${
              productType === c.productType
                ? "underline underline-offset-3"
                : "hover:bg-zinc-200"
            } hover:underline hover:underline-offset-3`}
            onClick={() => setType(c.productType)}
          >
            <div className="relative aspect-square h-12 w-12 shrink-0 overflow-hidden rounded-lg "> 
              {c.img}
            </div>
            <div className="w-full">{c.productType}</div>
          </div>
        ))}
      </div>
      {/* catalog */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 p-3 scroll-smooth font-sans h-screen gap-3 overflow-y-auto">
        {/* made to order */}
        {productType === "Made-To-Order" &&
          products
            .filter((p: any) => !p.stock)
            .map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
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
              </motion.div>
            ))}

        {/* stock */}
        {productType === "Stock" &&
          products
            .filter((p: any) => p.stock)
            .map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="col-span-1 grid grid-cols-1 w-full   pb-1 justify-between bg-zinc-50 shadow-md rounded-lg space-y-3">
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

      {/* bottom nav */}
      <NavPage />
    </div>
  );
};

export default Catalog;
