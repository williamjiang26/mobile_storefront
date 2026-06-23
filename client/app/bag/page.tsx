"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Header from "../components/header";

import NavPage from "../components/nav";
// import Button from "../components/slideButton";
const Page = () => {
  const router = useRouter();
  const sampleDescription = ["fresh-squeezed","30% sugar","30% ice",
    "medium",
    "to-go",
  ];
  return (
    <div className="flex flex-col max-h-screen ">
      <Header />
      <div className="w-[90%] mx-auto shrink-0 mt-25 sm:mt-30 m-3 text-2xl border h-25 sm:h-52 rounded-lg flex items-center justify-center">
        <div>Orders</div>
      </div>
      <div className="p-1 space-y-5 overflow-y-auto flex-auto h-screen w-[90%] mx-auto">
        {[1, 2, 3].map((p) => (
          <div className="border rounded-lg p-1 flex justify-between items-center">
            <div className="flex items-center">
              <div className="border rounded-lg h-10 w-10 p-15"></div>
              <div className="pt-1 px-1 border m-1 min-w-21 sm:min-w-52">
                <div className="mt-1">Orange juice</div>
                <div className="text-sm pl-1 sm:flex ">
                  ({sampleDescription.map((p) => (
                    <div className="min-w-fit">{p}, </div>
                  ))}
                  )
                </div>
              </div>
            </div>
            <div className="flex justify-between space-x-1">
              <div className="border rounded-lg p-1">edit</div>
              <div className="border rounded-lg p-1">checkout</div>
            </div>
          </div>
        ))}
      </div>
      <NavPage />
    </div>
  );
};

export default Page;
