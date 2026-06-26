import { useRouter } from "@/node_modules/next/navigation";
import { ShoppingBag,CircleStar, ReceiptText } from "lucide-react";

const NavPage = () => {
  const router = useRouter();
  return (
    <nav className="w-full bg-white border-t border-gray-200 pb-safe shadow-lg">
      <div className="w-[50%] mx-auto flex justify-between items-center py-3">
        {/* <div className="">bottom nav</div> */}
        <button
          className="flex flex-col items-center text-sm text-gray-500 hover:text-yellow-600  "
          onClick={() => router.push("/explore")}
        >
          <span>
            <CircleStar className="w-5 h-5" />
          </span>
          <span>explore</span>
        </button>
        <button
          className="flex flex-col items-center text-sm text-gray-500 hover:text-yellow-600  "
          onClick={() => router.push("/catalog")}
        >
          <span>
            <CircleStar className="w-5 h-5" />
          </span>
          <span>catalog</span>
        </button>
        <button
          className="flex flex-col items-center  text-sm text-gray-500 hover:text-yellow-600 "
          onClick={() => router.push("/bag")}
        >
          <span>
            <ShoppingBag className="w-5 h-5" />
          </span>
          <span>bag</span>
        </button>
      </div>
    </nav>
  );
};

export default NavPage;
