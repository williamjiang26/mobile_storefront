"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import data from "../data.json";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollHorizontal from "../components/features";
import VerticalTicker from "../components/reviews";
import Button from "../components/slideButton";
import { client, GET_PRODUCTS_QUERY } from "../actions/products";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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
  const [products, setProducts] = useState([]);
  const fetchMyProducts = async () => {
    try {
      const response = await client.query({
        query: GET_PRODUCTS_QUERY,
        fetchPolicy: "network-only",
      });
      setProducts((response.data as any).products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchMyProducts();
  const handleAdd = (p: any) => {
    const serializedItems = encodeURIComponent(JSON.stringify(p));
    router.push(`/order?items=${serializedItems}`);
    return;
  };
  const handleCheckout = (p: any) => {
    const serializedItems = encodeURIComponent(JSON.stringify(p));
    router.push(`/checkout?items=${serializedItems}`);
    return;
  };
  const containerVariants = {
    hidden: { opactiy: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  const [sliderRef] = useKeenSlider({
    // loop: true,
    mode: "free",
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 15 },
      },
    },
  });
  return (
    <div className="flex flex-col bg-slate-100/95">
      <Header />
      <div className="flex-1 scroll-smooth font-sans ">
        {/* 1 - checkout */}
        <div className="group flex flex-col cursor-pointer">
          {/* The main image container controls the rounding and hides the expanding/shrinking image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative overflow-hidden">
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
              <div className="relative flex mt-30 flex-col md:h-125 rounded-lg items-center justify-center bg-transparent font-sans dark:bg-black pb-5">
                <div className="basis-1/6 flex items-center justify-center font-bold text-3xl text-white/90">
                  <span className="[text-shadow:1px_1px_5px_rgba(0,0,0,0.3)] tracking-wide">
                    Shop popular products
                  </span>
                </div>

                <div ref={sliderRef} className="keen-slider">
                  {products
                    .filter((p: any) => !p.stock)
                    .slice(0, 5)
                    .map((p: any, index) => (
                      <div
                        key={index}
                        className="keen-slider__slide    flex flex-col bg-zinc-50 p-1 min-w-59 justify-between shadow-lg m-1 rounded-lg "
                      >
                        <div className="   flex-col rounded-md p-1">
                          <div className="rounded-lg relative  h-59  bg-zinc-50 p-1 overflow-hidden  ">
                            {p.img && (
                              <Image
                                src={p.img || "/placeholder.png"}
                                alt=""
                                fill
                                className="object-cover "
                              />
                            )}
                          </div>
                          <div className="font-semibold p-1">{p["name"]}</div>
                          <div className="p-1">from ${p["price"]}</div>
                        </div>
                        <div className="justify-center flex p-3">
                          <div
                            className="w-[80%] mx-auto flex justify-center items-center relative h-9 overflow-hidden z-10  rounded-lg text-black tracking-wider border-slate-300 border transition-colors duration-300 ease-in-out hover:text-white
                        before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10 before:bg-slate-300 before:scale-x-0
                         before:origin-left before:duration-200 before:ease-in-out before:transition-transform hover:before:scale-x-100
                        "
                            onClick={() => handleAdd(p)}
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
                <div className="basis-1/6 flex items-center justify-center font-bold text-3xl text-white/90 text-center mx-1">
                  <span className="[text-shadow:1px_1px_5px_rgba(0,0,0,0.3)] tracking-wide">
                    Products in stock ~ ships in 2-3 weeks
                  </span>
                </div>
                <div ref={sliderRef} className="keen-slider">
                  {products
                    .filter((p: any) => p.stock)
                    .slice(0, 5)
                    .map((p: any, index) => (
                      <div
                        key={index}
                        className="keen-slider__slide flex flex-col bg-zinc-50 p-1 min-w-59 shadow-lg m-1 rounded-lg "
                      >
                        <div className="w-full mx-auto  flex-col rounded-md p-1">
                          <div className="rounded-lg relative     bg-zinc-50 p-1 overflow-hidden h-59">
                            {p.img && (
                              <Image
                                src={p.img || "/placeholder.png"}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="font-semibold p-1">{p["name"]}</div>
                          {/* <div className=" p-1">{p["description"]}</div> */}
                          <div className="p-1">${p["price"]}</div>
                        </div>
                        <div
                          className="w-[80%] mx-auto flex justify-center items-center relative h-9 overflow-hidden z-10 border-slate-300 border rounded-lg text-black tracking-wider  transition-colors duration-500 ease-in-out hover:text-white before:absolute before:top-0 before:left-0 before:h-full before:w-full before:-z-10 before:bg-slate-300 before:scale-x-0 before:origin-left before:duration-200 before:ease-in-out before:transition-transform hover:before:scale-x-100 border-zinc-200"
                          onClick={() => handleCheckout(p)}
                        >
                          Checkout
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden flex w-full justify-center bg-blue-300">
              <div className="font-bold text-3xl text-white/90  text-start">
                "Conveniently placed healthy foods that will help you stay fit.
                Organic sugars and protein - no added ingredients." - brand
                motto
              </div>
            </div>
          </motion.div>
        </div>
        {/* 3 - video and explore button product catalog */}
        <div className="relative w-full h-screen overflow-hidden group font-sans bg-green-200">
          {/* Video Element */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Button Wrapper Container */}
          <div className="absolute bottom-12 left-[5%] z-10">
            <motion.button
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/catalog")}
              className="relative overflow-hidden px-6 py-3.5 rounded-lg bg-white text-black font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-slate-600 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              Explore
            </motion.button>
          </div>
        </div>
        {/* 4 - best features - animated scroll*/}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <ScrollHorizontal listName={"features"} />
        </motion.div>
        {/* 5 - Reviews */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="h-screen ">
            <VerticalTicker />
          </div>
        </motion.div>
        {/* 6 - Process */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <ScrollHorizontal listName={"process"} />
        </motion.div>
        {/* 7 - contact */}
        <div className="flex border mb-3  bg-gray-500 text-white font-bold text-lg p-1 h-32">
          <div className="flex items-center">
            Our team is available 9-5 7x/week, contact or get a quote
          </div>
          <div className="flex px-1 my-1 items-center justify-center">
            <Button
              className="items-center"
              onClick={() => {
                router.push("/contact");
              }}
            >
              Contact
            </Button>
          </div>
        </div>

        {/* 8 - guides */}
        <div className="flex flex-col md:flex-row sm:space-y-1 w-full md:w-[90%] mx-auto rounded-lg md:h-screen h-full items-center justify-between gap-3 mb-3 px-1">
          {/* mobile screen rectangle */}
          <div className="relative group overflow-hidden w-full md:aspect-square aspect-video rounded-lg bg-zinc-200">
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

            <div className="absolute bottom-0 p-5">
              <Button onClick={() => router.push("/locations")}>
                Find a outlet near you
              </Button>
            </div>
          </div>
          <div className="relative group overflow-hidden w-full md:aspect-square aspect-video rounded-lg bg-zinc-200">
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
              } // Fixed the fallback logic string
              alt={""}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 m-5">
              <Button onClick={() => router.push("/guides")}>
                Delivery guide
              </Button>
            </div>
          </div>
          <div className="relative w-full md:aspect-square rounded-lg bg-zinc-200">
            {/* 5 - FAQ */}
            <div className="m-5">
              <div className="font-semibold text-xl w-full">FAQs</div>
              <div className="flex flex-col w-full">
                {data["frequently asked questions"].map((f) => (
                  <AccordionItem f={f} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* footer  */}
        <Footer />
      </div>
    </div>
  );
}

const PageComponent = () => (
  <div className="relative w-full md:w-[90%] md:mx-auto overflow-hidden   h-250 bg-zinc-200">
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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      // variants={containerVariants}
    >
      <div className="w-full md:w-[90%] mx-auto">
        <div className="absolute bottom-0 mb-5">
          {/* <Button onClick={() => router.push("/contact")}>Contact</Button> */}
        </div>
      </div>
    </motion.div>
  </div>
);
