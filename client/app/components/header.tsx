"use client";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useState } from "react";
import { useRouter } from "@/node_modules/next/navigation";

const Header = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState("");
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.header
      animate={{
        y: hidden ? -120 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex fixed top-10 inset-x-0 z-50 mx-auto w-[80%] rounded-lg border bg-white/80 backdrop-blur justify-between"
    >
      <div
        className="hover:bg-zinc-200 p-6 hover:rounded-lg"
        onClick={() => router.push("/")}
      >
        logo
      </div>
      <div className="flex justify-between">
        <div
          className="relative p-3"
          onMouseEnter={() => setOpen("about")}
          onMouseLeave={() => setOpen("")}
        >
          <div className="hover:bg-zinc-200 hover:rounded-lg p-3">About</div>

          <AnimatePresence>
            {open === "about" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 top-full mt-2 w-56 rounded-lg border bg-white shadow-lg"
              >
                <div
                  className="p-3 hover:bg-zinc-100 rounded-lg"
                  onClick={() => router.push("/catalog")}
                >
                  Catalog
                </div>
                <div className="p-3 hover:bg-zinc-100"> </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className="relative p-3"
          onMouseEnter={() => setOpen("links")}
          onMouseLeave={() => setOpen("")}
        >
          <div className="hover:bg-zinc-200 hover:rounded-lg p-3">
            other links
          </div>

          <AnimatePresence>
            {open === "links" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 top-full mt-2 w-56 rounded-lg border bg-white shadow-lg"
              >
                <div className="p-3 hover:bg-zinc-100 rounded-lg">
                  refund policy
                </div>
                <div className="p-3 hover:bg-zinc-100">warranty</div>
                <div className="p-3 hover:bg-zinc-100 rounded-lg">
                  terms and agreements
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className="relative p-3"
          onMouseEnter={() => setOpen("guides")}
          onMouseLeave={() => setOpen("")}
        >
          <div className="hover:bg-zinc-200 hover:rounded-lg p-3">guides</div>

          <AnimatePresence>
            {open === "guides" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 top-full mt-2 w-56 rounded-lg border bg-white shadow-lg"
              >
                <div className="p-3 hover:bg-zinc-100 rounded-lg">
                  product selection guide
                </div>
                <div className="p-3 hover:bg-zinc-100">delivery guide</div>
                <div className="p-3 hover:bg-zinc-100 rounded-lg">
                  maintenance guide
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative p-3">
          <div className="hover:bg-zinc-200 hover:rounded-lg p-3">Blog</div>
        </div>
        <div className="relative p-3">
          <div className="hover:bg-zinc-200 hover:rounded-lg p-3">Log in</div>
        </div>
        <div className="relative p-3">
          <div className="hover:bg-zinc-200 hover:rounded-lg p-3">Sign up</div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
