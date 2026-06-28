"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Header from "../components/header";

import Nav from "../components/nav";
import Image from "next/image";
import { fetchCustomer } from "@/app/actions/customers";
import { useEffect, useState } from "react";
import { fetchProduct } from "../actions/products";
import { Trash2 } from "lucide-react";
const Page = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState({
    accountInformation: {
      email: "new@gmail.com",
    },
    shoppingCart: [],
    orders: [],
    products: [],
  });
  // get customer orders
  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const customerData = await fetchCustomer();
        if (customerData) {
          const fetchPromises = customerData.shoppingCart.map(
            async (order: any) => {
              const product = await fetchProduct(order.productId);
              return { ...order, product }; // Combine order data with product details
            }
          );
          const products = await Promise.all(fetchPromises);
          setCustomer({ products, ...customerData });
        }
      } catch (error) {
        console.error("Failed to load customer profile data:", error);
      }
    };
    loadCustomer();
  }, []);
  // create the order id and add it to customer.cart. if order already exists then dont add. if order id not paid, it goes to shoopinggcart otherwise it goes to orderhistory
  return (
    <div className="flex flex-col max-h-screen ">
      <Header />
      <div className="mt-28 shadow-sm relative overflow-hidden rounded-lg mx-auto h-35 px-5 py-3 flex justify-center w-[90%] ">
        <div className="flex flex-col items-center justify-between">
          <Image
            src={
              "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/ordersBanner.jpg"
            }
            alt=""
            fill
            className="object-cover scale-110 -z-10 transition-transform duration-500 ease-out group-hover:scale-100"
          />
          <div className="my-auto text-xl font-semibold">Bag</div>
        </div>
      </div>
      <div className="pt-5 space-y-3 overflow-y-auto flex-auto h-screen w-[90%] mx-auto">
        {customer?.products?.map((c: any, index) => {
          return (
            <div
              key={index}
              className="shadow-md p-1 border rounded-xl h-27 flex"
            >
              <div className="rounded-xl aspect-square h-full mx-auto my-auto relative overflow-hidden ">
                {c?.product?.img && (
                  <Image
                    src={c?.product?.img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="mx-auto my-auto space-y-1 pb-1 px-1">
                <div className="text-md sm:text-xl font-semibold">{c?.product?.name}</div>
                <div className="text-xs font-light">
                  {c?.product?.stock ? "stock" : "made-to-order"}
                </div>
              </div>
              <div className="mx-auto my-auto font-extralight pb-1 pr-1">
                {c?.product?.price}
              </div>
              <div className="flex justify-between space-x-1 my-auto mx-auto ">
                {!c?.product?.stock ? (
                  <div
                    className="border rounded-lg p-1"
                    onClick={() => {
                      router.push(`/order`);
                    }}
                  >
                    edit
                  </div>
                ) : (
                  <div className="w-10" />
                )}
                <div
                  className="border rounded-lg p-1"
                  onClick={() => {
                    router.push(`/checkout`);
                  }}
                >
                  checkout
                </div>
                <div
                  className="border rounded-lg p-1"
                  onClick={() => {
                    router.push(`/delete`);
                  }}
                >
                  <Trash2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Nav />
    </div>
  );
};

export default Page;
