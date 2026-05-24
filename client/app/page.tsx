"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import data from "./data.json";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect, useRef } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ScrollHorizontal from "./components/temp";

// import Image from "next/image";

function AccordionItem({ f }: { f: Record<string, any> }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col border-b border-gray-200 py-4 w-full">
      {/* Trigger: Clicking this toggles the state */}
      <div
        className="w-full text-2xl cursor-pointer flex justify-between items-center select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{f["question"]}</span>

        {/* Optional animated chevron indicator */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm mr-5"
        >
          ▼
        </motion.span>
      </div>

      {/* Animated Content Wrapper */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden" // Prevents text layout glitches during animation
          >
            <div className="pt-2 text-gray-600">{f["answer"]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default function Home() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const ITEM_WIDTH = 400;
  const GAP = 30;
  // Move from first item centered to last item centered
  const totalDistance = (data["features"].length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);
  const handleAdd = (price: string, url: string) => {
    console.log("🚀 ~ handleAdd ~ price:", price);
    const newItems = [{ price, url, quantity: 1 }];
    const serializedItems = encodeURIComponent(JSON.stringify(newItems));
    router.push(`/order?items=${serializedItems}`); // if (!response.ok)
    return;
  };
  const handleCheckout = (price: string) => {
    const newItems = [{ price, quantity: 1 }];
    const serializedItems = encodeURIComponent(JSON.stringify(newItems));
    router.push(`/checkout?items=${serializedItems}`); // if (!response.ok)
    return;
  };
  return (
    <div className="flex flex-col bg-zinc-300">
      <Header />
      <div className="flex-1 space-y-3 bg-zinc-300 scroll-smooth font-sans dark:bg-black">
        {/* 1 - checkout */}
        <div className="h-screen group flex flex-col cursor-pointer">
          {/* The main image container controls the rounding and hides the expanding/shrinking image */}
          <div className="relative overflow-hidden bg-zinc-200">
            {/* Image starts scaled up, and zooms out to scale-100 when the group is hovered */}
            {/* <Image
              src={
                // "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Family_mart.webp"
              } // Fixed the fallback logic string
              alt={"hero bg"}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            /> */}
            {/* Dark gradient overlay to ensure text is legible against light images */}
            {/* <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/80 to-transparent" /> */}
            {/* 1 - shop right away - popular products - glimpse of all categories */}
            <div className="relative flex mt-30 flex-col h-125 rounded-lg items-center justify-center bg-transparent font-sans dark:bg-black pb-5">
              <div className="basis-1/6 flex items-center justify-center font-bold text-3xl  text-white/60">
                Shop popular products
              </div>
              <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto ">
                {data["popular products"].slice(0, 5).map((p) => (
                  <div className="flex flex-col bg-zinc-50 p-1 w-59 justify-between shadow-lg m-1 rounded-lg ">
                    <div className="   flex-col rounded-md p-1">
                      <div className="rounded-lg relative aspect-square justify-center flex bg-zinc-50 p-1 overflow-hidden w-50">
                        {p.url && (
                          <Image
                            src={p.url || "/placeholder.png"}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="font-semibold p-1">{p["name"]}</div>
                      <div className="p-1">from {p["start amount"]}</div>
                    </div>
                    <div className="justify-center flex p-3">
                      <div
                        className="w-[80%] mx-auto  h-9 bg-zinc-50 rounded-lg hover:shadow-md flex items-center justify-center border border-zinc-200"
                        onClick={() => handleAdd(p["price"], p["url"])}
                      >
                        Add
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 2 - shop right away - products in stock - glimpse of all categories */}
            <div className="relative flex flex-col h-125 rounded-lg items-center justify-center bg-transparent font-sans dark:bg-black pb-5">
              <div className="basis-1/6 flex items-center justify-center text-3xl  text-white/60">
                Products in stock ~ ships in 2-3 weeks
              </div>
              <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
                {data["products in stock"].slice(0, 5).map((p) => (
                  <div className="flex flex-col bg-zinc-50 p-1 w-59 justify-between shadow-lg m-1 rounded-lg ">
                    <div className="w-full mx-auto  flex-col rounded-md p-1">
                      <div className="rounded-lg relative aspect-square justify-center flex bg-zinc-50 p-1 overflow-hidden w-50">
                        {p.url && (
                          <Image
                            src={p.url || "/placeholder.png"}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="font-semibold p-1">{p["name"]}</div>
                      {/* <div className=" p-1">{p["description"]}</div> */}
                      <div className=" p-1">{p["amount"]}</div>
                    </div>
                    <div className="justify-center flex p-3">
                      <div
                        className="w-[80%] mx-auto h-9 bg-zinc-50 rounded-lg hover:shadow-lg flex items-center justify-center border border-zinc-200"
                        onClick={() => handleCheckout(p["price"])}
                      >
                        Checkout
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 - video and explore button product catalog */}
        <div className="flex flex-col w-[80%] mx-auto items-center justify-between font-sans">
          <motion.div className="relative w-full overflow-hidden rounded-xl shadow-lg group">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover"
            >
              <source src="/video.mov" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />

            <div className="absolute bottom-0 left-0 p-8">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-black font-semibold rounded-lg shadow-md backdrop-blur-sm bg-white/90 hover:bg-white transition-all tracking-wide"
                onClick={() => {
                  router.push("/catalog");
                }}
              >
                Explore
              </motion.button>
            </div>
          </motion.div>
        </div>
        {/* 4 - best features - animated scroll*/}
        <div className=" ">
          <ScrollHorizontal />
        </div>
        {/* 5 - Process */}
        <div className="flex flex-col h-screen items-center justify-between font-sans dark:bg-black">
          <div className="basis-1/6 flex items-center justify-center text-5xl text-white uppercase font-bold">
            Process
          </div>
          <div className="basis-5/6 flex flex-row  w-[90%] mx-auto justify-between overflow-x-auto">
            {data["process"].slice(0, 5).map((f) => (
              <div className="group flex flex-col p-1 w-80 cursor-pointer">
                {/* The main image container controls the rounding and hides the expanding/shrinking image */}
                <div className="relative overflow-hidden rounded-xl h-96 bg-zinc-200">
                  {/* Image starts scaled up, and zooms out to scale-100 when the group is hovered */}
                  <Image
                    src={f["url"] || "/placeholder.png"} // Fixed the fallback logic string
                    alt={f["name"] || "Feature"}
                    fill
                    className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                  />

                  {/* Dark gradient overlay to ensure text is legible against light images */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Text forced to the bottom-left corner */}
                  <div className="absolute bottom-0 left-0 p-3 text-white font-semibold text-lg  ">
                    {f["name"]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 6 - Reviews */}
        <div className="h-screen">
          <div className="relative w-[90%] mx-auto overflow-hidden rounded-lg h-250 bg-zinc-200 items-center flex justify-center">
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
              } // Fixed the fallback logic string
              alt={""}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />
            <div className=" absolute bottom-5 text-black flex items-center  justify-center">
              <div
                className="bg-white py-3 px-5 rounded-lg hover:bg-white/80"
                onClick={() => router.push("/catalog")}
              >
                Leave a review
              </div>
            </div>
          </div>
        </div>

        {/* 6 - Find a location near you */}
        <div className="w-full h-screen">
          <div className="relative w-[90%] mx-auto  overflow-hidden rounded-lg h-250 bg-zinc-200">
            {/* Image starts scaled up, and zooms out to scale-100 when the group is hovered */}
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
              } // Fixed the fallback logic string
              alt={""}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />

            {/* Dark gradient overlay to ensure text is legible against light images */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

            {/* Text forced to the bottom-left corner */}
            <div className="absolute bottom-0 m-5 bg-zinc-100 p-3 items-center font-semibold text-lg justify-center flex  rounded-md hover:border hover:border-zinc-200">
              <div className="" onClick={() => router.push("/locations")}>
                Find a showroom near you
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[90%] mx-auto rounded-lg items-center justify-between gap-3">
          <div className="relative w-[80%] mx-auto overflow-hidden rounded-xl h-96 bg-zinc-200">
            {/* Image starts scaled up, and zooms out to scale-100 when the group is hovered */}
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
              } // Fixed the fallback logic string
              alt={""}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />

            {/* Dark gradient overlay to ensure text is legible against light images */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 m-5 bg-zinc-100 p-3 items-center font-semibold text-lg justify-center flex  rounded-md hover:border hover:border-zinc-200">
              <div className="" onClick={() => router.push("/contact")}>
                Contact or Get a quote
              </div>
            </div>
          </div>
          <div className="relative w-[80%] mx-auto overflow-hidden rounded-xl h-96 bg-zinc-200">
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
              } // Fixed the fallback logic string
              alt={""}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 m-5 bg-zinc-100 p-3 items-center font-semibold text-lg justify-center flex  rounded-md hover:border hover:border-zinc-200">
              <div className="" onClick={() => router.push("/guides")}>
                Delivery Guide
              </div>
            </div>
          </div>
          <div className="relative w-[80%] mx-auto overflow-hidden rounded-xl h-96 p-8  bg-zinc-200">
            {/* 5 - FAQ */}
            <div className="text-xl w-full">FAQs</div>
            <div className="flex flex-col w-full">
              {data["frequently asked questions"].map((f) => (
                <AccordionItem f={f} />
              ))}
            </div>
          </div>
        </div>
        {/* footer  */}
        <Footer />
      </div>
    </div>
  );
}
