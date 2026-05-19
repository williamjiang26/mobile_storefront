"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
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
      <div className="flex flex-row h-10 gap-10 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed - two options */}
        <div className="hover:bg-zinc-200 flex">
          <div className="">Made-To-Order</div>
        </div>
        <div className="hover:bg-zinc-200 flex">
          <div className="">Stock</div>
        </div>
      </div>
      <div className="flex-1 flex w-full overflow-y-auto bg-zinc-200 p-5 scroll-smooth font-sans dark:bg-black gap-10">
        {/* made to order */}
        {["yogurt", "chicken", "coconut water"].map((product) => (
          <div className="h-96 flex flex-col">
            <div className="basis-2/3">
              <div className="relative rounded-lg aspect-square p-1 h-210 w-130">
                <div className="">
                  <Image
                    src={
                      "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/images.jpg" ||
                      "/placeholder.png"
                    }
                    alt=""
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div>Starting at $5</div>
              <div>yogurt</div>
            </div>
            <div className="basis-1/3 flex mt-10 justify-center h- ">
              <div
                className="bg-slate-50 w-[80%] text-center rounded-lg"
                onClick={() => router.push("/order")}
              >
                Add
              </div>
            </div>
          </div>
        ))}

        {/* stock */}
        {/* <div className="flex flex-col p-1 w-59 justify-between">
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
        </div> */}
      </div>
    </div>
  );
};

export default Catalog;
