import React from "react";
import { motion } from "motion/react";
import data from "../data.json";
// Split Media Review Card Component
const Card = ({ name, date, rating, location, review, photos }) => (
  <div className="flex flex-col justify-between  overflow-hidden bg-white   border border-slate-10  rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group min-h-[220px]">
    {/* top */}
    <div className="flex justify-between">
      <div className="flex-1 flex-col">
        <div>{name}</div>
        <div>{date}</div>
        <div>{rating}</div>
      </div>
      <div className="flex-1 ">{location}</div>
    </div>
    {/* middle */}
    <div className=" ">{review}</div>
    {/* bottom */}
    <div className=" ">{photos}</div>
  </div>
);

// Ticker Column powered by Framer Motion
const MotionTickerColumn = ({ reviews, reverse = false }) => {
  // Double items to create a seamless infinite wrapping loop
  const duplicatedReviews = [...reviews, ...reviews];

  // Configure directional ranges based on reverse prop
  const initialY = reverse ? "-50%" : "0%";
  const animateY = reverse ? "0%" : "-50%";

  return (
    <div className="h-full overflow-hidden relative">
      <motion.div
        className="flex flex-col gap-5 py-2.5"
        initial={{ translateY: initialY }}
        animate={{ translateY: animateY }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35, // Control your speed here (lower = faster)
        }}
        // Framer Motion native layout state controls on hover
        whileHover={{ animationPlayState: "paused" }}
        style={{ pointerEvents: "auto" }}
      >
        {duplicatedReviews.map((review, index) => (
          <Card key={`${review.name}-${index}`} {...review} />
        ))}
      </motion.div>
    </div>
  );
};

export default function MotionReviewTicker() {
  const datasets = data["reviews"];

  const columnLeft = [datasets[0], datasets[2]];
  const columnCenter = [datasets[0], datasets[2]];
  const columnRight = [datasets[0], datasets[2]];

  return (
    <div className="w-full   py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black tracking-tight text-white/50 dark:text-white sm:text-5xl">
            Leave a review
          </h2>
        </div>
        {/* 3-Column Ticker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-187.5 overflow-hidden relative rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-900/20 p-5">
          <MotionTickerColumn reviews={columnLeft} reverse={false} />
          <MotionTickerColumn reviews={columnCenter} reverse={true} />
          <MotionTickerColumn reviews={columnRight} reverse={false} />

          {/* Vignette Lighting Overlays */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-linear-to-b from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 pointer-events-none z-10" />
        </div>
        {/* Title */}
        <div className="text-center max-w-lg mt-3 mx-auto mb-16">
          <div
            className="bg-white rounded-lg text-3xl font-black tracking-tight text-black/50 dark:text-white sm:text-5xl"
            onClick={() => router.push("review")}
          >
            Leave a review
          </div>
        </div>
      </div>
    </div>
  );
}
