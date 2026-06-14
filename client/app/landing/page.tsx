"use client";
import Image from "@/node_modules/next/image";
import { Store } from "lucide-react";
//
import { motion } from "motion/react";

const Page = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="min-h-screen flex flex-col w-screen">
      <div className="h-[10vh] flex justify-between items-center mx-1">
        <div className="border flex items-center p-3 gap-1">
          <Store className="w-5 h-5" /> <div>storefront</div>
        </div>
        <div className="border flex justify-between items-center space-x-3">
          <div className="px-5 py-2 hover:border rounded-lg hover:text-white">blog</div>
          <div className="bg-gray-900 hover:bg-gray-900/70 text-white rounded-lg px-3 py-2">
            contact
          </div>
        </div>
      </div>
      <div className="min-h-[75vh] border flex flex-col space-y-1">
        {/* tools for running you retail business...  */}{" "}
        <div className="h-[25vh] flex justify-center items-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              mass: 1.9,
            }}
          >
            <div className="text-center flex items-center leading-tight tracking-tight">
              a set of tools you need for running your retail business
            </div>
          </motion.h1>
        </div>
        {/* tools popup  */}
        <div className="h-[25vh] flex gap-1 mx-1">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-1 w-full mx-auto"
          >
            {[
              { title: "storefront", url: "" },
              { title: "business dashboard", url: "" },
            ].map((p, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-lg relative overflow-hidden group bg-slate-900"
              >
                {/* {p.url && ( */}
                <Image
                  src={
                    "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/images.jpg" ||
                    "/placeholder.png"
                  }
                  alt=""
                  fill
                  sizes="100"
                  className="object-cover"
                />
                {/* )} */}
                <div className="absolute bottom-0 left-0 p-6 text-white bg-linear-to-t from-black/60 to-transparent w-full">
                  <h2 className="font-bold">{p.title}</h2>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* contact / demo */}
        <div className="h-[25vh] flex border justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-2 gap-3 items-center"
          >
            <motion.div variants={itemVariants} className=" ">
              <div className="bg-gray-900 hover:bg-gray-900/70 text-white rounded-lg px-3 py-2">
                contact
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className=" ">
              <div className="bg-gray-200 rounded-lg px-5 py-2 hover:bg-gray-200/50">
                demo
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="h-[15vh]">
        {/* footer */}- storefront - socials - products - contact phone email -
        blog - reviews
      </div>
    </div>
  );
};

export default Page;
