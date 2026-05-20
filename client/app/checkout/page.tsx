"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { fetchClientSecret } from "../actions/stripe";

import Header from "../components/header";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret }}
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
