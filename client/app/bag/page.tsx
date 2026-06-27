"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Header from "../components/header";

import Nav from "../components/nav";
import Image from "next/image";
import { fetchCustomer } from "@/app/actions/customers";
import React, { useEffect, useState } from "react";
import { fetchProduct } from "../actions/products";
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
          const fetchPromises = customerData.shoppingCart.map(async (order) => {
            const product = await fetchProduct(order.productId);
            return { ...order, product }; // Combine order data with product details
          });
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
        {customer?.products?.map((orders, index) => {
          return (
            <div
              key={index}
              className="border rounded-lg w-full flex justify-between items-center p-3"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square w-56 mr-5">
                <Image
                  src={orders["product"]["img"]}
                  alt=""
                  fill
                  className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                />
              </div>
              <div className="w-full">
                <div className="text-md">{orders["product"]["name"]}</div>
                <div className="text-xs">{orders["product"]["stock"] ? "stock" : "made-to-order"}</div>
              </div>
              <div className="text-center px-3"> {orders["product"]["price"]}</div>
              <div className="flex justify-between space-x-1">
                <div
                  className="border rounded-lg p-1"
                  onClick={() => {
                    router.push(`/order`);
                  }}
                >
                  edit
                </div>
                <div
                  className="border rounded-lg p-1"
                  onClick={() => {
                    router.push(`/checkout`);
                  }}
                >
                  checkout
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
