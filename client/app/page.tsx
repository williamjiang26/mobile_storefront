"use client";
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/dist/index";
import Image from "@/node_modules/next/image";
//
import { useRouter } from "@/node_modules/next/navigation";
import { Store } from "lucide-react";
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faPinterest,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
//
import { motion } from "motion/react";
const Page = () => {
  const router = useRouter();
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
        ease: "easeInOut",
      },
    },
  } as const;
  return (
    <div className="min-h-screen flex flex-col w-screen">
      <div className="h-[10vh] bg-gray-100 flex justify-between items-center px-1">
        <div className="flex items-center p-3 gap-1">
          <Store className="w-5 h-5" /> <div>storefront</div>
        </div>
        <div className="flex justify-between items-center space-x-3">
          <div className="px-5 py-2 hover:border rounded-lg hover:text-white">
            blog
          </div>
          <div className="bg-gray-900 hover:bg-gray-900/70 text-white rounded-lg px-3 py-2">
            contact
          </div>
        </div>
      </div>
      <div className="min-h-[75vh] flex flex-col space-y-1">
        {/* tools for running you retail business...  */}
        <div className="h-[25vh] flex justify-center items-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              mass: 1.9,
            }}
          >
            <div className="text-center flex items-center leading-tight tracking-tight text-3xl font-light ">
              a set of tools you need for running your retail business
            </div>
          </motion.div>
        </div>
        {/* tools popup  */}
        <div className="h-[25vh] flex gap-1 mx-1 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-1 w-full mx:auto"
          >
            {[
              {
                title: "storefront",
                url: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-06-14+at+12.36.56+PM.png",
                nav: "/landing/docs",
              },
              {
                title: "business dashboard",
                url: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-06-14+at+3.14.20+PM.png",
                nav: "/businessdashboard/docs",
              },
            ].map((p, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-lg relative overflow-hidden group bg-slate-900"
                onClick={() => router.push(p.nav)}
              >
                {p.url && (
                  <Image
                    src={p.url || "/placeholder.png"}
                    alt=""
                    fill
                    sizes="100"
                    className="object-cover transition hover:scale-110 duration-300 ease-in-out "
                  />
                )}
                <div className="absolute bottom-0 left-0 p-6 text-white bg-linear-to-t from-black/60 to-transparent w-full">
                  <h2 className="font-bold">{p.title}</h2>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* contact / demo */}
        <div className="h-[25vh] flex justify-center bg-gray-50  ">
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
      {/* footer */}
      <div className="h-[15vh] bg-gray-500 text-white grid grid-cols-2 px-1">
        <div className="col-span-2 text-xl font-semibold">storefront</div>
        <div className="col-span-1 flex flex-col">
          {["call us", "email us", "follow us"].map((p, index) => (
            <div className="mr-auto text-sm" key={index}>
              {p}
            </div>
          ))}
          <div>
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faTiktok} />
            <FontAwesomeIcon icon={faYoutube} />
            <FontAwesomeIcon icon={faPinterest} />
          </div>
        </div>
        <div className="col-span-1 flex flex-col">
          {["products", "blog", "reviews"].map((p, index) => (
            <div className="ml-auto text-sm" key={index}>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
