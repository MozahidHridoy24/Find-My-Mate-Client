import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get clientSecret from backend using TanStack Query
  const { data: clientSecret, isLoading: isSecretLoading } = useQuery({
    queryKey: ["payment-intent"],
    queryFn: async () => {
      const res = await axiosSecure.post("/create-payment-intent", {
        premiumCost: 5,
      });
      return res.data.clientSecret;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentSucceeded(true);
      setLoading(false);

      try {
        // 🔁 Update the biodata's premiumStatus to "pending"
        await axiosSecure.patch(`/biodatas/premium-status/${id}`, {
          premiumStatus: "pending",
        });

        // ✅ Optionally: store payment record
        await axiosSecure.post("/payments", {
          id,
          email: user.email,
          amount: 5,
          paymentIntentId: paymentIntent.id,
          createdAt: new Date(),
        });

        // ✅ Redirect to the biodata details page
        navigate("/dashboard/view-biodata");
      } catch (err) {
        console.error("Error updating status or storing payment:", err);
        setErrorMessage("Payment succeeded, but updating server failed.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl mb-4 font-semibold text-rose-700 text-center">
        Make Biodata Premium
      </h2>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />

      {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}

      <button
        type="submit"
        disabled={
          !stripe ||
          !clientSecret ||
          loading ||
          isSecretLoading ||
          paymentSucceeded
        }
        className={`mt-6 w-full bg-[#C2185B] text-white py-3 rounded font-semibold transition ${
          loading || paymentSucceeded
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#8E44AD]"
        }`}
      >
        {loading
          ? "Processing..."
          : paymentSucceeded
          ? "Payment Successful"
          : "Pay $5"}
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
