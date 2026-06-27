"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { fetchClientSecret } from "../actions/stripe";
import Header from "../components/header";
import data from "../data.json";
import { updateCustomer } from "../actions/customers";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// 1. This inner component handles the search parameters and Stripe logic safely
const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");
  const product = itemsParam
    ? JSON.parse(decodeURIComponent(itemsParam))
    : null;
  const { id, name, price, img, stock, priceId } = product;
  const lineItems = [{ price: priceId, quantity: 1 }];
  // upload the order to cart if order is not already in cart
  updateCustomer(id)
  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => fetchClientSecret({ lineItems }),
      }}
    >
      <div className="flex flex-col h-screen">
        <Header />
        <div className="mt-37.5">
          <EmbeddedCheckout />
        </div>
      </div>
    </EmbeddedCheckoutProvider>
  );
};

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
