"use client";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useState } from "react";
import { useRouter } from "@/node_modules/next/navigation";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignOutButton,
  UserAvatar,
  UserButton,
} from "@clerk/nextjs";
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
      className="flex fixed px-1 sm:px-5 py-5 top-5 inset-x-0 z-50 mx-1 sm:w-[80%] sm:mx-auto rounded-lg border backdrop-blur justify-between"
    >
      <div
        className="flex justify-start items-center hover:bg-zinc-200 hover:rounded-lg text-2xl font-light"
        onClick={() => router.push("/landing")}
      >
        Get Active Foods
      </div>
      <div className="flex justify-end items-center gap-3 py-3">
        <div
          className=""
          onMouseEnter={() => setOpen("about")}
          onMouseLeave={() => setOpen("")}
        >
          <div className="hover:bg-zinc-200 hover:rounded-lg ">About</div>
          <AnimatePresence>
            {open === "about" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-15 mt-2 w-56 rounded-lg border bg-white shadow-lg"
              >
                <div
                  className="p-3 hover:bg-zinc-100 rounded-lg"
                  onClick={() => router.push("/catalog")}
                >
                  Catalog
                </div>
                <div
                  className="p-3 hover:bg-zinc-100 rounded-lg"
                  onClick={() => router.push("/about")}
                >
                  What is getActiveFoods ?
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          onMouseEnter={() => setOpen("guides")}
          onMouseLeave={() => setOpen("")}
        >
          <div className="hover:bg-zinc-200 hover:rounded-lg">Guides</div>

          <AnimatePresence>
            {open === "guides" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-15 right-1 mt-2 w-56 rounded-lg border bg-white shadow-lg"
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
        <div>
          <div
            className="hover:bg-zinc-200 hover:rounded-lg "
            onClick={() => router.push("/blog")}
          >
            Blog
          </div>
        </div>
        <div
          onMouseEnter={() => setOpen("links")}
          onMouseLeave={() => setOpen("")}
        >
          <div className="hover:bg-zinc-200 hover:rounded-lg ">Docs</div>

          <AnimatePresence>
            {open === "links" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-15 right-10 mt-2 w-56 rounded-lg border bg-white shadow-lg"
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
        <div>
          <Show when="signed-in">
            <div
              onMouseEnter={() => setOpen("user-portal")}
              onMouseLeave={() => setOpen("")}
              className="inline-block" // Keeps layout tight around the avatar
            >
              <UserAvatar />
            </div>
          </Show>
          <Show when="signed-out"><SignInButton />
          </Show>
          <AnimatePresence>
            {open === "user-portal" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full mt-2 w-56 rounded-lg border bg-white shadow-lg"
              >
                <div
                  className="p-3 hover:bg-zinc-100 rounded-lg"
                  onClick={() => router.push("/customer")}
                >
                  my account
                </div>
                <div className="p-3 hover:bg-zinc-100">
                  <SignOutButton />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
