"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/header";
import data from "../data.json";
const Catalog = () => {
  const router = useRouter();
  const [productType, setType] = useState("made-to-order");

  return (
    <div className="flex flex-col">
      <Header />
      {/* toggle */}
      <div className="mt-30 flex flex-row h-10 gap-10 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed - two options */}
        <div className="hover:bg-zinc-200 flex">
          <div
            className={`${productType === "made-to-order" ? "underline" : ""}`}
            onClick={() => setType("made-to-order")}
          >
            Made-To-Order
          </div>
        </div>
        <div className="hover:bg-zinc-200 flex">
          <div
            className={`${productType === "stock" ? "underline" : ""}`}
            onClick={() => setType("stock")}
          >
            Stock
          </div>
        </div>
      </div>
      {/* catalog */}
      <div className="flex-1 flex w-full h-full overflow-y-auto bg-zinc-200 p-5 scroll-smooth font-sans dark:bg-black gap-10">
        {/* made to order */}
        {productType === "made-to-order" &&
          data["popular products"].map((p) => (
            <div className="flex flex-col shadow-md p-3 rounded-lg hover:shadow-lg">
              <div className="">
                <div className="relative rounded-lg h-96 w-60 p-1  ">
                  <Image
                    src={
                      "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/images.jpg"
                    }
                    alt=""
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="mt-3">Starting at $5</div>
                <div>{p["name"]}</div>
              </div>
              <div className="  flex mt-25 mb-3 justify-center w-[80%] mx-auto ">
                <div
                  className="bg-slate-50 hover:bg-slate-50/75 w-full h-full justify-center flex px-3 py-1 items-center text-center rounded-lg"
                  onClick={() => router.push("/order")}
                >
                  Add
                </div>
              </div>
            </div>
          ))}

        {/* stock */}
        {productType === "stock" &&
          data["products in stock"].map((p) => (
            <div className="flex flex-col p-1 w-59 justify-between">
              <div className="rounded-md p-1">
                <div className="rounded-lg aspect-square bg-zinc-100 p-1">
                  photo
                </div>
                <div className="font-semibold p-1">
                  <div>yogurt</div>
                  <div>original</div>
                  <div>strawberry</div>
                  <div>Large</div>
                  <div>$7</div>
                </div>
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
  );
};

export default Catalog;
