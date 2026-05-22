"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { fetchClientSecret } from "../actions/stripe";
import Header from "../components/header";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// 1. This inner component handles the search parameters and Stripe logic safely
const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const rawItems = searchParams.get("items");

  const lineItems = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : [];

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => fetchClientSecret({ lineItems }),
      }}
    >
      <div className="flex flex-col h-screen">
        <Header />
        {/* Changed mt-50 to an arbitrary layout value if 50 isn't in your config */}
        <div className="mt-[200px]">
          <EmbeddedCheckout />
        </div>
      </div>
    </EmbeddedCheckoutProvider>
  );
};

// 2. This outer wrapper handles the Suspense boundary, satisfying Next.js static rendering
const Checkout = () => {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-zinc-500">
          Loading checkout forms...
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
};

export default Checkout;