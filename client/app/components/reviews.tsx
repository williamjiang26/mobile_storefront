import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// import "./styles.css";

import { motion } from "motion/react";
import data from "../data.json";
import { useRouter } from "@/node_modules/next/navigation";

// Split Media Review Card Component
interface CardProps {
  name: string;
  date: string;
  stars: number;
  location: string;
  review: string;
  attachedPhotos: string;
}
const Card = ({
  name,
  date,
  stars,
  location,
  review,
  attachedPhotos,
}: CardProps) => (
  <div className="keen-slider__slide flex flex-col justify-between overflow-hidden bg-white border border-slate-10 p-2 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group *:**:">
    {/* top */}
    <div className="flex justify-between">
      <div className="flex flex-col">
        <div className=" "> {"⭐".repeat(stars)}</div>
        <div className=" ">{review}</div>
        <div className=" "> - {name}</div>
      </div>
      <div className="flex flex-col ">
        <div>{location}</div>
        <div className="flex justify-end">{date}</div>
      </div>
    </div>
    {/* middle */}

    {/* bottom */}
    <div className=" ">{attachedPhotos}</div>
  </div>
);

export default function MotionReviewTicker() {
  const datasets = data["reviews"];
  const router = useRouter();
  const [sliderRef] = useKeenSlider({
    // loop: true,
    slides: {
      origin: "center",
      perView: 3,
      spacing: 10,
    },
    vertical: true,
  });
  return (
    <div className="w-full   py-20 px-3 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black tracking-tight text-white dark:text-white sm:text-5xl">
            <span className="[text-shadow:1px_1px_1px_rgba(0,0,0,0.1)] tracking-wide">
              Leave a review
            </span>
          </h2>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider   h-150 overflow-hidden rounded-3xl border-slate-200 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-900/20 p-5 max-w-xl mx-auto"
        >
          <motion.div
            className="flex flex-col gap-5 w-full h-full"
            initial={{ y: 0 }}
            animate={{ y: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
              repeatType: "loop",
            }}
          >
            {data["reviews"].map((review, i) => (
              <Card key={i} {...review} />
            ))}
            {data["reviews"].map((review, i) => (
              <Card key={i} {...review} />
            ))}
          </motion.div>

          <div className="absolute top-0 inset-x-0 h-20 bg-linear-to-b from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-10" />
          {/* <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-10" /> */}
        </div>
        {/* Title */}
        <div className="text-center max-w-lg mt-5 mx-auto mb-16">
          <div
            className="relative overflow-hidden z-10 bg-white
            px-5 py-3 rounded-lg  
            text-slate-300 font-semibold uppercase tracking-wider
            transition-colors duration-300 ease-in-out hover:text-white  
            
            before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10
            before:bg-slate-300 before:scale-x-0 before:origin-left
            before:transition-transform before:duration-300 before:ease-in-out
            hover:before:scale-x-100"
            onClick={() => router.push("review")}
          >
            Leave a review
          </div>
        </div>
      </div>
    </div>
  );
}
