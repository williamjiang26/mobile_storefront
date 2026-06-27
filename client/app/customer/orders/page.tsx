"use client";
import { client, fetchCustomer, GET_CUSTOMER_QUERY } from "@/app/actions/customers";
import { useRouter } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "../../components/bottomNav";
import Header from "../../components/header";

const Page = () => {
  const router = useRouter();

  const [customer, setCustomer] = useState({
    accountInformation: {
      email: "new@gmail.com",
    },
    shoppingCart: [],
    orders: [],
  });
  // get customer orders
   
  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const customerData = await fetchCustomer();
        if (customerData) {
          setCustomer(customerData);
        }
      } catch (error) {
        console.error("Failed to load customer profile data:", error);
      }
    };
    loadCustomer();
  }, []);


  return (
    <div className="max-h-screen w-full flex flex-col">
      <Header />
      <main className="space-y-5 overflow-y-auto mt-27 h-screen scroll-smooth">
        {customer.orders.map((c, index) => (
          <div
            key={index}
            className="border rounded-lg mx-auto px-3 py-3 flex justify-between w-[90%]"
            // onClick={() => {
            //   router.push(`/customer/orders/orderNo=${c.orderNo}`);
            // }}
          >
            <div className="flex flex-col">
              {/* <div className="text-xl">{c.orderNo}</div> */}
              {/* <div className="text-xs font-light">{c.orderDate}</div> */}
            </div>
            <div className="flex flex-col">
              {/* <div className="ml-auto">{c.points}</div> */}
              <div className="text-sm border rounded-lg p-1 font-light">
                Leave a review + 10 points
              </div>
            </div>
          </div>
        ))}
      </main>
      <BottomNav />
    </div>
  );
};

export default Page;
