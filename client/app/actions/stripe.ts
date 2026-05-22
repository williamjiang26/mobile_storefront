"use server";

import { headers } from "next/headers";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface LineItem {
  price: string;
  quantity: number;
}

interface FetchSecretArgs {
  lineItems: LineItem[];
}
export async function fetchClientSecret({
  lineItems,
}: FetchSecretArgs): Promise<string> {
  const origin = (await headers()).get("origin");

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    line_items: lineItems,
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
