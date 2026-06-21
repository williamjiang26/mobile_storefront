"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { useRef } from "react";
import data from "../data.json";

export default function ScrollHorizontal({
  listName,
}: {
  listName: keyof typeof data;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const ITEM_WIDTH = 500;
  const GAP = 30;

  const totalDistance = (data[listName].length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <div id="example" className="h-auto overflow-visible">
      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="h-[300vh] relative motion-reduce:h-auto"
      >
        {/* Sticky Wrapper - Changed to justify-center with a responsive gap */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-[8vh] overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:py-12">
          {/* 1. Header - Centers horizontally automatically */}
          <h1 className="text-center text-[clamp(32px,5vh,72px)] text-white m-0 font-bold tracking-tight z-10">
            <span className="[text-shadow:1px_1px_1px_rgba(0,0,0,0.1)] tracking-wide">
              {listName.charAt(0).toUpperCase() + listName.slice(1)}
            </span>
          </h1>
          {/* 2. Gallery Track Container - Vertically balanced by the parent flex layout */}
          <div className="w-full flex justify-start pl-[calc(50vw-200px)] pr-[50vw] max-[600px]:pl-[calc(50vw-150px)]">
            <motion.div
              className="flex gap-7.5 will-change-transform max-[600px]:gap-4 motion-reduce:transform-none! z-20"
              style={{ x }}
            >
              {(data[listName] as any[]).map((feature) => (
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
                    <span className="block text-[15px] text-neutral-100 font-['Azeret_Mono',monospace] mb-2 tracking-wider">
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
    </div>
  );
}
