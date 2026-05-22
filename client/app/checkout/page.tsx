"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { fetchClientSecret } from "../actions/stripe";

import Header from "../components/header";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
  const searchParams = useSearchParams();
  const rawItems = searchParams.get("items");

   const lineItems = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : [];
  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        // Automatically triggers your server action with the right parameters
        fetchClientSecret: () => fetchClientSecret({ lineItems }),
      }}
    >
      <div className="flex flex-col h-screen">
        <Header />
        <div className=" mt-50  ">
          <EmbeddedCheckout />
        </div>
      </div>
    </EmbeddedCheckoutProvider>
  );
};

export default Checkout;
