import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Click on the Sign Up button and fill in your details. You can use email/password or Google sign-in to register.",
  },
  {
    question: "What is the difference between Normal and Premium membership?",
    answer:
      "Normal users can view limited profiles, while Premium users get full access including contact information and priority listing.",
  },
  {
    question: "How secure is my personal data?",
    answer:
      "We use Firebase Authentication, encrypted connections, and secure servers to ensure your data is safe. Payments are processed via Stripe.",
  },
  {
    question: "Can I update or delete my profile?",
    answer:
      "Yes, you can edit your biodata at any time from your dashboard. Contact support if you want your account deleted.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use the Contact page to send a message to our support team. We'll get back to you as soon as possible.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 px-6 py-16">
      <div className="w-11/12 mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#C2185B] mb-12">
          Frequently Asked <span className="text-[#8E44AD]">Questions</span>
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#C2185B] rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-[#C2185B]">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <FaMinus className="text-[#8E44AD]" />
                ) : (
                  <FaPlus className="text-[#8E44AD]" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 text-gray-700 border-t border-[#C2185B]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
