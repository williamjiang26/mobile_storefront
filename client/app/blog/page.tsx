"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      {/* scrollable */}
      <div className="flex-1 mt-30 overflow-y-auto space-y-3 scroll-smooth font-sans p-3">
         <div className="border rounded-xl p-3">date - title</div>
        <div className="border rounded-xl p-3">blog 1</div>
      </div>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Page;
