"use client";
import Image from "@/node_modules/next/image";
import { motion } from "motion/react";
//
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

  //
  const [feature, setFeature] = useState({
    video: "ordermanagementdemo",
    title: "automated customer support",
  });
  const handleOpen = (p: any) => {
    setFeature(p);
    setIsOpen(true);
  };
  //
  const features = [
    { video: "ordermanagementdemo", title: "automated customer support" },
    { video: "ordermanagementdemo", title: "request sales representative" },
    // { video: ordermanagementdemo, title: "account management: rewards" },
    // { video: ordermanagementdemo, title: "account management: order tracking" },
    // { video: ordermanagementdemo, title: "streamlined checkout" },
    // { video: ordermanagementdemo, title: "find nearby locations" },
    // { video: ordermanagementdemo, title: "animated landing page" },
    // { video: ordermanagementdemo, title: "browse catalog" },
  ];
  return (
    <div className="flex flex-col m-1 w-screen h-screen">
      <div className="space-y-3">
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
        {/* storefront */}
        <div className="text-3xl font-light">storefront</div>
        {/*  a dashboard  */}
        <div>a mobile site</div>
        {/* <div>
          <li className="pl-3">feature demos:</li>
          <ol className="pl-6">
            {features.map((p: any) => (
              <li className="hover:underline" onClick={() => handleOpen(p)}>
                {p.title}
              </li>
            ))}
          </ol>
        </div> */}
      </div>

      {/* preview click for live demo */}
      <div className="pt-6">
        <motion.div
          variants={itemVariants}
          className="rounded-lg relative overflow-hidden aspect-video group bg-slate-900"
          onClick={() => router.push("/landing")}
        >
          <Image
            src={
              "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-06-14+at+12.36.56+PM.png"
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
