"use client";
import { useRouter } from "@/node_modules/next/navigation";
import { CircleStar, ReceiptText } from "lucide-react";

const BottomNav = () => {
  const router = useRouter();
  return (
    <nav className="w-full bg-white border-t border-gray-200 pb-safe shadow-lg">
      <div className="w-[50%] mx-auto flex justify-between items-center py-3">
        {/* Navigation Links / Icons */}
        <button
          className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600"
          onClick={() => router.push("/customer/rewards")}
        >
          <span>
            <CircleStar className="w-5 h-5"/>
          </span>
          <span>Rewards</span>
        </button>
        <button
          className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600 "
          onClick={() => router.push("/customer/orders")}
        >
          <span>
            <ReceiptText className="w-5 h-5"/> 
          </span>
          <span>Orders</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
