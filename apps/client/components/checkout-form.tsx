"use client";

import { ShippingFormInputs } from "./shipping-form";
import { useState } from "react";
import { ConfirmError } from "@stripe/stripe-js";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkoutState = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  if (checkoutState.type === "loading") {
    return (
      <div className="flex items-center gap-2">
        <Spinner /> Loading...
      </div>
    );
  } else if (checkoutState.type === "error") {
    return <div>Error: {checkoutState.error.message}</div>;
  }

  const handleClick = async () => {
    setLoading(true);
    await checkoutState.checkout.updateEmail(shippingForm.email);
    await checkoutState.checkout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "US",
      },
    });

    const res = await checkoutState.checkout.confirm();

    if (res.type === "error") {
      setError(res.error);
    }
    setLoading(false);
  };
  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <Button
        disabled={loading}
        onClick={handleClick}
        className="flex items-center gap-2 mt-6"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner /> Loading...
          </div>
        ) : (
          "Pay Now"
        )}
      </Button>
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
