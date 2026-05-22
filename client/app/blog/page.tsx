"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";

const Page = () => {
  return (
    <div className="flex flex-col bg-zinc-300">
      <Header />
      {/* scrollable */}
      <div className="flex-1 mt-30 overflow-y-auto space-y-3 bg-zinc-300 scroll-smooth font-sans dark:bg-black">
        blog format date title blog in markdown
      </div>
      {/* footer  */}
     <Footer />
    </div>
  );
};

export default Page;
