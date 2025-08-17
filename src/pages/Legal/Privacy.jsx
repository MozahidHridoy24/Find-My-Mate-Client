import React from "react";

const Privacy = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 px-6 py-16">
      <div className="w-11/12 mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#C2185B] mb-8">
          Privacy <span className="text-[#8E44AD]">Policy</span>
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            Welcome to <span className="font-semibold">Find My Mate</span>. We
            respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your data when you use our website and services.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Personal details such as name, email, phone number, and gender.
            </li>
            <li>
              Biodata details including age, education, profession, preferences,
              etc.
            </li>
            <li>Login credentials and authentication data via Firebase.</li>
            <li>Payment details (processed securely via Stripe).</li>
            <li>
              Usage data such as IP address, browser type, and device
              information.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6">
            <li>Provide matchmaking and communication features.</li>
            <li>Manage user roles (Normal, Premium, Admin).</li>
            <li>Process secure payments and subscriptions.</li>
            <li>Enhance user experience and improve our platform.</li>
            <li>Ensure safety and prevent fraudulent activities.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            3. Data Sharing
          </h2>
          <p>
            We do not sell or rent your personal data. However, we may share it
            with:
          </p>
          <ul className="list-disc ml-6">
            <li>
              Service providers such as{" "}
              <span className="font-medium">Firebase</span> (authentication &
              hosting) and <span className="font-medium">Stripe</span> (payment
              processing).
            </li>
            <li>Law enforcement if required by law or legal process.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            4. Cookies & Tracking
          </h2>
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience, analyze usage patterns, and improve services.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            5. Data Security
          </h2>
          <p>
            Your information is stored securely. We use encryption,
            authentication, and restricted access controls. Payments are
            processed directly by Stripe and not stored on our servers.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your account and
            personal data at any time. To request changes, please contact our
            support team.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with the “Last Updated” date.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            <em>Last Updated: August 2025</em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
