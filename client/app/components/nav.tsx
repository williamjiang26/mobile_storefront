import { useRouter } from "@/node_modules/next/navigation";
import { CircleStar, ReceiptText } from "lucide-react";

const NavPage = () => {
  const router = useRouter();
  return (
    <nav className="w-full bg-white border-t border-gray-200 pb-safe shadow-lg">
      <div className="w-[50%] mx-auto flex justify-between items-center py-3">
        {/* <div className="">bottom nav</div> */}
        <div onClick={() => router.push("/explore")}>explore</div>
        <div onClick={() => router.push("/catalog")}>catalog</div>
        <button
          className="flex flex-col items-center   "
          onClick={() => router.push("bag")}
        >
          <span>
            <CircleStar className="w-5 h-5" />
          </span>
          <span>bag</span>
        </button>
      </div>
    </nav>
  );
};

export default NavPage;
