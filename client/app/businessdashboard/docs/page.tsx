"use client";
import Image from "@/node_modules/next/image";
import { motion } from "motion/react";

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
  return (
    <div className="flex flex-col m-1">
      <div className="space-y-3">
        {/* business dashboard */}
        <div className="text-3xl font-light">business dashboard</div>
        {/*  a dashbpard  */}
        <div>a dashboard to easily manage operations at scale</div>
      </div>

      {/* preview click for live demo */}
      <div className="pt-6"><motion.div
        variants={itemVariants}
        className="rounded-lg relative overflow-hidden aspect-video group bg-slate-900"
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
      </motion.div></div>
      
    </div>
  );
};

export default Page;
