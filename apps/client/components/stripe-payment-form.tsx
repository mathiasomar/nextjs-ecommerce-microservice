"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import CheckoutForm from "./checkout-form";
import { ShippingFormInputs } from "./shipping-form";
import useCartStore from "@/store/cart-store";
import { CartItemsType } from "@repo/types";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";

const stripePromise = loadStripe(
  "pk_test_51STLD8C74BXw1KVqu9pWUnZ9UgpvTcp64z6WTWJGb33zduLFoCWvVoSe0r3idww5qqSo4rlrB3RbcCPnFxkEaRHg00gkimNP1P"
);

const fetchClientSecret = async (token: string, cart: CartItemsType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMETN_SERVICE_URL}/session/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cart }), // Include cart in the request body
    }
  );
  const json = await response.json();
  return json.checkoutSessionClientSecret;
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((t) => {
      setToken(t);
      if (t) {
        fetchClientSecret(t, cart).then((secret) => setClientSecret(secret));
      }
    });
  }, [getToken, cart]);

  if (!token || !clientSecret) return <div>Loading...</div>;

  return (
    <CheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
