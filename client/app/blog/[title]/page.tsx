"use client"
import { useParams } from "@/node_modules/next/navigation";



const Page = () => {
  const searchParams = useParams() || {}
  const title = searchParams['title']
  console.log("🚀 ~ Page ~ title:", title)
  const blog = {}
  return (
    <div className="flex flex-col">
      <div className="text-xl font-light">{/* date */} {blog.date}</div>
      <div> {/* title */}{blog.title}</div>
       <div>{/* content */}{blog.content}</div>
    </div>
  );
};

export default Page;
