"use client";
import { fetchEssay } from "@/app/actions/essays";
import { useParams, usePathname, useSearchParams } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = usePathname();
  const title = searchParams.split("/").pop() as string;
  const [essays, setEssays] = useState({title:"",date:"",content:""});
  useEffect(() => {
    const loadEssay = async () => {
      try {
        const essayData = await fetchEssay(title);
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
    <div className="flex flex-col">
      <div className="text-lg font-light">{essays?.date}</div>
      <div className="text-xl font-light">
        {/* title */}
        {essays?.title}
      </div>
      <div className="text-md font-light">
        {/* content */}
        {essays?.content}
      </div>
    </div>
  );
};

export default Page;
