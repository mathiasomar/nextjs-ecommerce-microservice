import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../../utils/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const webhooksRoute = new Hono();

webhooksRoute.post("/stripe", async (c) => {
  const body = c.req.text();
  const sig = c.req.header("Stripe-Signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(await body, sig!, webhookSecret);
  } catch (error) {
    console.log("Webhook verification failed");
    return c.json({ error: "Webhook verification failed" }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      //   TODO: CREATE ORDER IN DATABASE HERE USING session AND lineItems DATA
      console.log("Webhook received: ", session);

      break;
  }

  return c.json({ received: true }, 200);
});

export default webhooksRoute;
