import Image from "next/image";
import data from "./data.json";
export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-zinc-700">
      <div className="flex flex-col h-10 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed */}
        banner - catalog
        {data["headers"].map((header) => (
          <div className="">{header}</div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-zinc-50 scroll-smooth font-sans dark:bg-black">
        {/* scrollable */}
        <div className="flex flex-col h-125 w-[80%] mx-auto items-center justify-between bg-zinc-50 pb-20 font-sans dark:bg-black">
          <div className="flex">featured</div>
          <div className="bg-zinc-100 w-35 h-12 items-center justify-center flex self-start rounded-md hover:border hover:border-zinc-200">
            <div className="">Explore</div>
          </div>
        </div>
        <div className="flex flex-col h-125  items-center justify-center bg-zinc-200 font-sans dark:bg-black pb-5">
          <div className="basis-1/6 flex items-center justify-center">
            shop popular products
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["popular products"].slice(0, 3).map((p) => (
              <div className="flex flex-col p-1 w-59 justify-between ">
                <div className=" rounded-md  p-1">
                  <div className="rounded-lg aspect-square bg-zinc-50 p-1">
                    photo
                  </div>
                  <div className="font-semibold p-1">{p["name"]}</div>
                </div>
                <div className="justify-center flex ">
                  <div className=" w-[80%] mx-auto  h-9 bg-zinc-50 rounded-md flex items-center justify-center hover:border hover:border-zinc-300">
                    Add
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-125  items-center justify-center bg-zinc-300 font-sans dark:bg-black  pb-5">
          <div className="basis-1/6 flex items-center justify-center">
            best features
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["features"].slice(0, 3).map((f) => (
              <div className="flex flex-col p-1 w-59">
                <div className=" rounded-md bg-zinc-200 p-1">
                  <div className="rounded-lg aspect-square bg-zinc-50 p-1">
                    photo
                  </div>
                  <div className="p-1">{f["name"]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-125  items-center justify-center bg-zinc-500 font-sans dark:bg-black  pb-5">
          footer
        </div>
      </div>
    </div>
  );
}
