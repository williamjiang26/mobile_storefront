"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import data from "../data.json";

interface LineItem {
  price: string;
  quantity: number;
}
const Catalog = () => {
  const router = useRouter();
  const [productType, setType] = useState("made-to-order");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  const handleAdd = (price: string) => {
    console.log("🚀 ~ handleAdd ~ price:", price)
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
    <div className="flex flex-col ">
      <Header />
      {/* toggle */}
      <div className="mt-30 flex flex-row p-1  gap-10 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed - two options */}
        <div
          className={`   rounded-lg px-5 py-3 flex ${
            productType === "made-to-order" ? "underline " : "hover:bg-zinc-200"
          }   hover:underline`}
          onClick={() => setType("made-to-order")}
        >
          Made-To-Order
        </div>
        <div
          className={`   rounded-lg px-5 py-3 flex ${
            productType === "stock" ? "underline " : "hover:bg-zinc-200"
          }  hover:underline`}
          onClick={() => setType("stock")}
        >
          Stock
        </div>
      </div>
      {/* catalog */}
      <div className="flex-1 grid w-full grid-cols-6 h-300 overflow-y-auto bg-zinc-200 p-5 scroll-smooth font-sans dark:bg-black gap-10">
        {/* made to order */}
        {productType === "made-to-order" &&
          data["popular products"].map((p) => (
            <div className="col-span-1 flex flex-col shadow-md pb-1 bg-zinc-50 rounded-lg">
              <div className="group rounded-lg cursor-pointer">
                <div className="relative overflow-hidden rounded-lg h-96 w-60 bg-zinc-200">
                  <Image
                    src={p["url"]}
                    alt=""
                    fill
                    className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="px-1 mt-3">
                  <div className="font-semibold">{p["name"]}</div>
                  <div className="">Starting at {p["start amount"]}</div>
                </div>
              </div>
              <div className="flex mt-25 mb-3 justify-center w-[80%] mx-auto ">
                <div
                  className="border border-zinc-300 hover:bg-zinc-100/90 hover:shadow-md w-full h-full justify-center flex px-3 py-1 items-center text-center rounded-lg"
                  onClick={() => handleAdd(p["price"])}
                >
                  Add
                </div>
              </div>
            </div>
          ))}

        {/* stock */}
        {productType === "stock" &&
          data["products in stock"].map((p) => (
            <div className="flex flex-col pb-1  justify-between bg-zinc-50 shadow-md rounded-lg space-y-3">
              <div className="group rounded-lg  cursor-pointer">
                <div className="relative overflow-hidden rounded-lg h-96 w-60  ">
                  <Image
                    src={p["url"]}
                    alt=""
                    fill
                    className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="p-1">
                  <div className="font-semibold ">{p["name"]}</div>
                  <div>{p["amount"]}</div>
                </div>
              </div>
              <div className="justify-center flex">
                <div
                  className="w-[80%] mx-auto h-9 bg-zinc-50 hover:shadow-md rounded-lg flex items-center justify-center hover:bg-zinc-100 border border-zinc-300"
                  onClick={() => handleCheckout(p["price"])}
                >
                  Checkout
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
