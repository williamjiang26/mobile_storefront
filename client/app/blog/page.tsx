"use client";
import { useEffect, useState } from "react";
import Header from "../components/header";

import Footer from "../components/footer";
import { useRouter } from "@/node_modules/next/navigation";
import { fetchEssays } from "../actions/essays";

 
const Page = () => {
  const router = useRouter();
  const [essays, setEssays] = useState([]);
 
  useEffect(() => {
    const loadEssay = async () => {
      try {
        const essayData = await fetchEssays();
        if (essayData) {
          setEssays(essayData);
        }
      } catch (error) {
        console.error("Failed to load customer profile data:", error);
      }
    };
    loadEssay();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* toggle */}
      <div className="flex flex-col mt-28 w-[90%] sm:w[80%] mx-auto py-1 gap-5 font-sans dark:bg-black overflow-y-auto h-screen">
        {essays.map((p: any, index) => (
          <div
            key={index}
            className="border rounded-lg  p-3 flex items-center"
            onClick={() => router.push(`/blog/${p.title}`)}
          >
            <div className="text-lg font-light">{p.date}</div>-
            <div>{p.title}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
