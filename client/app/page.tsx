"use client";
import { useRouter } from "@/node_modules/next/navigation";
import Image from "next/image";
import data from "./data.json";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/dist/index";
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faPinterest,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Header from "./components/header";

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

  return (
    <div className="flex flex-col bg-zinc-300">
      <Header />
      {/* scrollable */}
      <div className="flex-1 mt-30 overflow-y-auto space-y-3 bg-zinc-300 scroll-smooth font-sans dark:bg-black">
        {/* 1 - shop right away - popular products - glimpse of all categories */}
        <div className="flex flex-col h-125 rounded-lg items-center justify-center bg-zinc-300 font-sans dark:bg-black pb-5">
          <div className="basis-1/6 flex items-center justify-center">
            Shop popular products
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
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
                    onClick={() => router.push("/order")}
                  >
                    Add
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 1 - shop right away - products in stock - glimpse of all categories */}
        <div className="flex flex-col h-125 rounded-lg items-center justify-center bg-zinc-300 font-sans dark:bg-black pb-5">
          <div className="basis-1/6 flex items-center justify-center">
            Products in stock ~ ships in 2-3 weeks
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["products in stock"].slice(0, 5).map((p) => (
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
                  {/* <div className=" p-1">{p["description"]}</div> */}
                  <div className=" p-1">{p["amount"]}</div>
                </div>
                <div className="justify-center flex p-3">
                  <div
                    className="w-[80%] mx-auto h-9 bg-zinc-50 rounded-lg hover:shadow-lg flex items-center justify-center border border-zinc-200"
                    onClick={() => router.push("/checkout")}
                  >
                    Checkout
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 3 - video and explore button product catalog */}
        <div className="flex flex-col w-[80%] mx-auto items-center justify-between mb-10 font-sans dark:bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full overflow-hidden rounded-xl shadow-lg group"
          >
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
        {/* 2 - best features - animated scroll*/}
        <div className="flex flex-col h-125 items-center justify-center bg-zinc-300 font-sans dark:bg-black pb-5">
          <div className="basis-1/6 flex items-center justify-center">
            best features
          </div>
          <div className="basis-5/6 flex flex-row w-[80%] mx-auto justify-between overflow-x-auto">
            {data["features"].slice(0, 3).map((f) => (
              <div className="group flex flex-col p-1 w-60 cursor-pointer">
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
        {/* 4 - Reviews */}
        <div className="relative w-[80%] mx-auto overflow-hidden rounded-xl h-96 bg-zinc-200 items-center flex justify-center">
          <Image
            src={
              "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
              "/placeholder.png"
            } // Fixed the fallback logic string
            alt={"" || "Feature"}
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
        <div className="flex h-125 w-[80%] mx-auto rounded-lg items-center justify-between bg-zinc-100 pb-20 font-sans dark:bg-black">
          {/* 5 - FAQ */}
          <div className="p-8 text-xl w-full">FAQs</div>
          <div className="flex flex-col w-full">
            {data["frequently asked questions"].map((f) => (
              <AccordionItem f={f} />
            ))}
          </div>
        </div>{" "}
        {/* 6 - Process */}
        <div className="flex flex-col h-125 w-[80%] mx-auto rounded-lg items-center justify-between bg-zinc-200 pb-20 font-sans dark:bg-black">
          {/* 5 - How to order */}
          <div className="basis-1/6 flex items-center justify-center">
            Process
          </div>
          <div className="basis-5/6 flex flex-row w-full justify-between overflow-x-auto">
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
        <div className="relative w-[80%] mx-auto  overflow-hidden rounded-xl h-96 bg-zinc-200">
          {/* Image starts scaled up, and zooms out to scale-100 when the group is hovered */}
          <Image
            src={
              "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
              "/placeholder.png"
            } // Fixed the fallback logic string
            alt={"" || "Feature"}
            fill
            className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
          />

          {/* Dark gradient overlay to ensure text is legible against light images */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          {/* Text forced to the bottom-left corner */}
          <div className="absolute bottom-0 m-5 bg-zinc-100 p-3 items-center font-semibold text-lg justify-center flex  rounded-md hover:border hover:border-zinc-200">
            Find a showroom near you
            <div className="" onClick={() => router.push("/catalog")}></div>
          </div>
        </div>
        {/* 6 - Find a location near you */}
        <div className="flex w-[80%] mx-auto rounded-lg items-center justify-between gap-3">
          <div className="relative w-[80%] mx-auto overflow-hidden rounded-xl h-96 bg-zinc-200">
            {/* Image starts scaled up, and zooms out to scale-100 when the group is hovered */}
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
                "/placeholder.png"
              } // Fixed the fallback logic string
              alt={"" || "Feature"}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />

            {/* Dark gradient overlay to ensure text is legible against light images */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 m-5 bg-zinc-100 p-3 items-center font-semibold text-lg justify-center flex  rounded-md hover:border hover:border-zinc-200">
              <div className="" onClick={() => router.push("/catalog")}>
                Contact or Get a quote
              </div>
            </div>
          </div>
          <div className="relative w-[80%] mx-auto overflow-hidden rounded-xl h-96 bg-zinc-200">
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
                "/placeholder.png"
              } // Fixed the fallback logic string
              alt={"" || "Feature"}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 m-5 bg-zinc-100 p-3 items-center font-semibold text-lg justify-center flex  rounded-md hover:border hover:border-zinc-200">
              <div className="" onClick={() => router.push("/catalog")}>
                Delivery Guide
              </div>
            </div>
          </div>
          <div className="relative w-[80%] mx-auto overflow-hidden rounded-xl h-96 bg-zinc-200">
            {/* Image starts scaled up, and zooms out to scale-100 when the group is hovered */}
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
                "/placeholder.png"
              } // Fixed the fallback logic string
              alt={"" || "Feature"}
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
            />

            {/* Dark gradient overlay to ensure text is legible against light images */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

            {/* Text forced to the bottom-left corner */}
            <div className="absolute bottom-0 m-5 bg-zinc-100 p-3 items-center font-semibold text-lg justify-center flex  rounded-md hover:border hover:border-zinc-200">
              <div className="" onClick={() => router.push("/catalog")}>
                Product Selection Guide
              </div>
            </div>
          </div>
        </div>
        {/* footer  */}
        <div className="relative flex h-125 pt-30 justify-between w-[90%] mx-auto bg-zinc-500 font-sans dark:bg-black rounded-t-lg text-white">
          <div className="absolute m-5 top-0 left-0">Logo</div>
          <div className="flex flex-col pl-10 w-full">
            {/* follow us */}
            <div className="font-semibold">Get in touch</div>
            <div>Email us</div>
            <div>718-788-2888</div>
            <div className="font-semibold">Follow Us</div>
            <div>
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faTiktok} />
              <FontAwesomeIcon icon={faYoutube} />
              <FontAwesomeIcon icon={faPinterest} />
            </div>
          </div>
          <div className="flex flex-col w-full">
            {/* Company */}
            <div className="font-semibold">Company</div>
            <div>Catalog</div>
            <div>Blog</div>
            <div>Locations</div>
          </div>
          <div className="flex flex-col w-full">
            {/* all product types */}
            <div className="font-semibold">Products</div>
            <div>avocado yogurt</div>
            <div>sous vide chicken breast</div>
            <div>coconut water</div>
            <div>sour plum juice</div>
            <div>dried steak chips</div>
            <div>honey water</div>
          </div>
          <div className="flex flex-col w-full">
            {/* guides */}
            <div className="font-semibold">Support</div>
            <div>Contact</div>
            <div>Guides</div>
            <div>Terms and conditions</div>
            <div>Refund Policy</div>
            <div>Warranty</div>
            <div>FAQ</div>
          </div>
          <div className="flex flex-col w-full">
            {/* guides */}
            <div className="font-semibold">Payment Methods</div>
            <div>VISA</div>
            <div>Mastercard</div>
            <div>Amex</div>
            <div>Apple Pay</div>
            <div>Cash App</div>
            <div>Zelle</div>
          </div>
          {/* <div className="flex flex-col">warranty and policies</div>{" "}
          <div className="flex flex-col">payment methods</div> */}
          <div className="absolute m-5 bottom-0 flex">
            Copywright 2026 @ Brand.com
          </div>
        </div>
      </div>
    </div>
  );
}
