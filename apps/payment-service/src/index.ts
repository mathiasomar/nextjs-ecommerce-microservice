import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import webhooksRoute from "./routes/webhooks.route.js";

const app = new Hono();

app.use("*", clerkMiddleware());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3002"],
  })
);

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.route("/session", sessionRoute);
app.route("/webhooks", webhooksRoute);

// test endpoint to create a stripe product

// app.post("/create-stripe-product", async (c) => {
//   const res = await stripe.products.create({
//     id: "123",
//     name: "Test Product",
//     description: "This is a test product",
//     default_price_data: {
//       currency: "usd",
//       unit_amount: 10 * 100,
//     },
//   });

//   return c.json(res);
// });

// test endpoint to create a stripe price

// app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "123",
//   });

//   return c.json(res);
// });

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Payment service running port ${info.port}`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
