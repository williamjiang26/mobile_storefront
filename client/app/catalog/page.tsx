"use client";
import { useRouter } from "@/node_modules/next/navigation";
import data from "../data.json";
const Catalog = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen bg-zinc-700">
      <div className="flex flex-row h-10 gap-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed - banner*/}
        {/* logo */}
        <div onClick={() => router.push("/")}>logo</div>
        search box - about - other links - guides - log in - sign up
      </div>
      <div className="flex flex-row h-10 hover:h-35 gap-10 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed - categories*/}
        {data["headers"].map((header) => (
          <div className="hover:bg-zinc-200 flex flex-row gap-3 p-3">
            <div className="rounded-lg aspect-square bg-zinc-50 w-10"> </div>
            <div className="">{header}</div>
          </div>
        ))}
        <div className="hover:bg-zinc-200 flex flex-row gap-3 p-3 hover:translate-1">
          <div className="">Explore All</div>
          <div className=" bg-zinc-50 w-10">Arrow</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-zinc-50 scroll-smooth font-sans dark:bg-black">
        catalog
      </div>
    </div>
  );
};

export default Catalog;
