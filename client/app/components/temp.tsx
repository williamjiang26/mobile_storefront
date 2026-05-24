"use client";

import Image from "next/image"; // Cleaned up your node_modules import path
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import data from "../data.json";

export default function ScrollHorizontal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const ITEM_WIDTH = 500;
  const GAP = 30;

  const totalDistance = (data["features"].length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <div id="example" className="h-auto overflow-visible">
      {/* Scroll Container (Track length) */}
      <div
        ref={containerRef}
        className="h-[300vh] relative motion-reduce:h-auto"
      >
        {/* Sticky Wrapper - Spans full width to lock sticky positioning securely */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-start overflow-hidden px-[calc(50vw-200px)] max-[600px]:px-[calc(50vw-150px)] motion-reduce:relative motion-reduce:h-auto motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:py-12.5 motion-reduce:px-5">
          {/* Centered Background Header */}
          <h1 className="absolute top-35 left-1/2 -translate-x-1/2 w-full text-center text-[clamp(36px,8vw,72px)] text-white m-0 uppercase font-bold tracking-tight z-0">
            Features
          </h1>

          {/* Gallery Track */}
          <motion.div
            className="flex gap-7.5 will-change-transform max-[600px]:gap-3.75 motion-reduce:transform-none! z-10"
            style={{ x }}
          >
            {data["features"].map((feature) => (
              <div
                key={feature.id}
                className="gallery-item shrink-0 w-125 h-150 rounded-xl relative overflow-hidden max-[600px]:w-70 max-[600px]:h-87.5 before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent before:via-black/30 before:to-black/80 before:z-10 before:pointer-events-none"
              >
                {/* Next.js Image Component */}
                <Image
                  src={feature.url}
                  alt={feature.name}
                  fill
                  sizes="(max-width: 600px) 280px, 500px"
                  className="object-cover object-center pointer-events-none"
                  priority={feature.id <= 2}
                />

                {/* Item Content Overlay */}
                <div className="absolute bottom-7.5 left-7.5 right-7.5 z-20">
                  <span className="block text-[15px] text-neutral-500 font-['Azeret_Mono',monospace] mb-2 tracking-wider">
                    0{feature.id}
                  </span>
                  <h2 className="text-[28px] font-semibold text-white m-0 leading-tight">
                    {feature.name}
                  </h2>
                  <h5 className="text-[14px] font-normal text-neutral-300 mt-1.5 leading-snug line-clamp-2">
                    {feature.description}
                  </h5>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
