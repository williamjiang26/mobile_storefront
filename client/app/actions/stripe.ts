"use server";

import { headers } from "next/headers";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function fetchClientSecret(): Promise<string> {
  const origin = (await headers()).get("origin");

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of
        // the product you want to sell
        price: "price_1TX6Gr05ICSAGFaR8IB292hO",
        quantity: 2,
      },
      {
        // Provide the exact Price ID (for example, price_1234) of
        // the product you want to sell
        price: "price_1TX6Gr05ICSAGFaR8IB292hO",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  });
  if (!session.client_secret) {
    throw new Error(
      "Stripe failed to generate a client_secret for this session."
    );
  }
  return session.client_secret;
}
