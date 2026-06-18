"use client";
import Image from "@/node_modules/next/image";
import { motion } from "motion/react";

import { useRouter } from "@/node_modules/next/navigation";
import ResponsiveDialog from "../../components/ResponsiveDialog";
import { useState } from "react";
  
const Page = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  } as const;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [feature, setFeature] = useState({
    video: " ",
    title: "automated customer support",
  });
  const handleOpen = (p:any) => {
    setFeature(p);
    setIsOpen(true);
  };
  const features = [
    { video: " ", title: "manage customer conversations" },
    { video: " ", title: "customize knowledge database" },
    //
    // { video: ordermanagementdemo, title: "store views" },
    // { video: ordermanagementdemo, title: "post products" },
    // { video: ordermanagementdemo, title: "write blogs" },
    //
    // { video: ordermanagementdemo, title: "manage orders" },
    // { video: ordermanagementdemo, title: "manage inventory" },
    // { video: ordermanagementdemo, title: "manage locations" },
    //
    // { video: ordermanagementdemo, title: "store payables" },
    //
  ];
  return (
    <div className="flex flex-col m-1">
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={feature.title}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: 7,
          }}
        >
          <source src="/ordermanagementdemo.mp4" type="video/mp4" />
        </video>
      </ResponsiveDialog>
      <div className="space-y-3">
        {/* business dashboard */}
        <div className="text-3xl font-light">business dashboard</div>
        {/*  a dashbpard  */}
        <div>a dashboard to easily manage operations at scale</div>
        <li className="pl-3">feature demos:</li>
        <ol className="pl-6">
          {features.map((p) => (
            <li className="hover:underline" onClick={() => handleOpen(p)}>
              {p.title}
            </li>
          ))}
        </ol>
      </div>
      {/* preview click for live demo */}
      <div className="pt-6">
        <motion.div
          variants={itemVariants}
          className="rounded-lg relative overflow-hidden aspect-video group bg-slate-900"
          // onClick={() => router.push("/businessdashboard")}
        >
          <Image
            src={
              "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-06-14+at+3.14.20+PM.png"
            }
            alt=""
            fill
            sizes="100"
            className="object-cover transition hover:scale-110 duration-300 ease-in-out "
          />

          <div className="absolute bottom-0 left-0 p-6 text-white bg-linear-to-t from-black/60 to-transparent w-full">
            <h2 className="font-bold">try demo</h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
