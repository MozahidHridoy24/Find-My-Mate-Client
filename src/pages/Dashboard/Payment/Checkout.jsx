import { useParams, useNavigate } from "react-router";
import { useState } from "react";
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

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams(); // MongoDB _id from route
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch biodata to get biodataId
  const { data: biodata, isLoading: biodataLoading } = useQuery({
    queryKey: ["biodata", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata-details/${id}`);
      return res.data;
    },
  });

  // ✅ Fetch user's contact requests
  const { data: myRequests = [], isLoading: requestLoading } = useQuery({
    queryKey: ["my-contact-requests", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contact-requests/${user.email}`);
      return res.data;
    },
  });

  // ✅ Create Stripe payment intent for $5
  const { data: clientSecret, isLoading: secretLoading } = useQuery({
    queryKey: ["contact-payment-intent"],
    queryFn: async () => {
      const res = await axiosSecure.post("/create-payment-intent", {
        premiumCost: 5,
      });
      return res.data.clientSecret;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret || !biodata) return;

    setLoading(true);
    setErrorMessage("");

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
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
      try {
        // ✅ Save the contact request to DB
        await axiosSecure.post("/contact-requests", {
          biodataId: biodata.biodataId,
          userEmail: user.email,
          status: "pending",
          paymentIntentId: paymentIntent.id,
          createdAt: new Date(),
        });

        await axiosSecure.post("/payments", {
          RequestedContactId: biodata.biodataId,
          email: user.email,
          amount: 5,
          paymentIntentId: paymentIntent.id,
          createdAt: new Date(),
        });

        navigate("/dashboard/my-contact-requests");
      } catch (err) {
        console.error(err);
        setErrorMessage("Payment succeeded, but contact request failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  const alreadyRequested = myRequests?.some(
    (req) => req.biodataId === biodata?.biodataId
  );

  if (biodataLoading || secretLoading || requestLoading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold text-center text-[#C2185B] mb-4">
        Request Contact Info - $5
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Biodata ID</label>
        <input
          readOnly
          value={biodata?.biodataId || "Loading..."}
          className="w-full border border-gray-300 p-2 rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Your Email</label>
        <input
          readOnly
          value={user?.email}
          className="w-full border border-gray-300 p-2 rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
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
      </div>

      {errorMessage && (
        <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading || secretLoading || alreadyRequested}
        className={`w-full py-2 rounded font-semibold transition-all ${
          alreadyRequested
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#C2185B] hover:bg-[#8E44AD] text-white"
        }`}
      >
        {alreadyRequested
          ? "Already Requested"
          : loading
          ? "Processing..."
          : "Pay & Request"}
      </button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
