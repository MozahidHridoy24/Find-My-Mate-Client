import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    try {
      // Create a payment method (You’ll replace this with backend intent call)
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      } else console.log(paymentMethod);

      // You should send paymentMethod.id to your backend here to confirm payment
      // Simulating success for now
      setSuccess("Payment successful! 🎉");

      Swal.fire({
        title: "Success!",
        text: "Payment completed successfully!",
        icon: "success",
        confirmButtonColor: "#C2185B",
      });

      // Reset card
      card.clear();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#C2185B]">
        Secure Payment <FaLock className="inline ml-1 text-sm" />
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6 p-4 border rounded">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-[#C2185B] hover:bg-[#8E44AD] text-white py-3 rounded font-semibold transition duration-300 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay $5"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
