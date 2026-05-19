"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { fetchClientSecret } from "../actions/stripe";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
  // return <CheckoutFlow />;
  //  return (
  //   <div>
  //     Checkout
  //     <a href="https://buy.stripe.com/eVq6ozeyL2O4b8kexwgjC01">Pay</a>
  //   </div>
  // );
  return (
    <div className="flex flex-col bg-zinc-700">
      <div className="   bg-slate-50  ">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret}}
        >
          <div className="mx-auto  ">
            <EmbeddedCheckout />
          </div>{" "}
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

const CheckoutFlow = () => {
  // state
  // page 1
  // return (
  //   <div className="flex h-screen justify-center items-center">
  //     <div className="flex justify-between mx-auto w-[50%]">
  //       <div className="border-2 aspect-square flex items-center w-50 justify-center rounded-lg">Original</div>
  //       <div className="border-2 aspect-square flex items-center w-50 justify-center rounded-lg">Matcha</div>
  //     </div>
  //   </div>
  // );
  // page 2
  // return (
  //   <div className="flex h-screen justify-center items-center">
  //     <div className="flex justify-between mx-auto w-[50%]">
  //       <div className="border-2 aspect-square flex items-center w-50 justify-center rounded-lg">
  //         Small
  //       </div>
  //       <div className="hover:shadow-lg hover:border-2 aspect-square flex items-center w-50 justify-center rounded-lg">
  //         Medium
  //       </div>
  //       <div className="border-2 aspect-square flex items-center w-50 justify-center rounded-lg">
  //         Large
  //       </div>
  //     </div>
  //   </div>
  // );
  // page 3
  // return (
  //   <div className="flex flex-col h-screen justify-center items-center">
  //     <div>Fruits</div>
  //     <div>Choose any 2</div>
  //     <div className="flex flex-col justify-between mx-auto w-[50%] gap-1">
  //       {["Strawberry", "Blueberry", "Banana", "Peach", "Mango"].map((fruit) => (
  //         <div className="border-2 flex rounded-lg mx-auto w-[80%] justify-between px-1 items-center">
  //           <div className="border aspect-square w-5"></div>
  //           {fruit}
  //         </div>
  //       ))}
  //     </div>
  //     <div className="self-start mx-auto w-[50%]">Popular Combinations</div>
  //     <div className="flex justify-between mx-auto w-[50%]">
  //       {["Strawberry Banana", "Strawberry Blueberry", "Peach Mango"].map((combo) => (
  //         <div className="border-2 aspect-square flex items-center w-50 justify-center rounded-lg">
  //           {combo}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  // page 4
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex justify-between mx-auto w-[50%]">
        <div className="border-2 aspect-square flex items-center w-50 justify-center rounded-lg">
          Pick Up
        </div>
        <div className="border-2 aspect-square flex items-center w-50 justify-center rounded-lg">
          Delivery
        </div>
      </div>
    </div>
  );
};
export default Checkout;
