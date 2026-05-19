"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

import { fetchClientSecret } from "../api/create-checkout-session/route";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const router = useRouter();
  // return <CheckoutFlow />;
  //  return (
  //   <div>
  //     Checkout
  //     <a href="https://buy.stripe.com/eVq6ozeyL2O4b8kexwgjC01">Pay</a>
  //   </div>
  // );
  return (
    <div className="flex flex-col h-screen bg-zinc-700">
      <div className="flex flex-row h-10 gap-3 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        {/* fixed - banner*/}
        {/* logo */}
        <div
          className="hover:bg-zinc-200 p-3 hover:rounded-lg"
          onClick={() => router.push("/")}
        >
          logo
        </div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">search box</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">about</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">
          other links
        </div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">guides</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">log in</div>
        <div className="hover:bg-zinc-200 p-3 hover:rounded-lg">sign up</div>
      </div>
      <div className="min-h-screen bg-slate-50  ">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <div className="mx-auto h-screen ">
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
