"use client";
import { useRouter } from "@/node_modules/next/navigation";
import BottomNav from "../../components/bottomNav";
import Header from "../../components/header";

const Page = () => {
  const router = useRouter();
  return (
    <div className="max-h-screen w-full flex flex-col">
      <Header />
      <main className="space-y-5 overflow-y-auto mt-27 h-screen scroll-smooth">
        {[
          {
            orderNo: "# 16000",
            orderDate: "9/25/24",
            points: "210 points",
          },
        ].map((c,index) => (
          <div
            key={index}
            className="border rounded-lg mx-auto px-3 py-3 flex justify-between w-[90%]"
            onClick={() => {
              router.push(`/customer/orders/orderNo=${c.orderNo}`);
            }}
          >
            <div className="flex flex-col">
              <div className="text-xl">{c.orderNo}</div>
              <div className="text-xs font-light">{c.orderDate}</div>
            </div>
            <div className="flex flex-col">
              <div className="ml-auto">{c.points}</div>
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
