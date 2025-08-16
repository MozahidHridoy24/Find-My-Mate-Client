import React from "react";

const Terms = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 px-6 py-16">
      <div className="w-11/12 mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#C2185B] mb-8">
          Terms & <span className="text-[#8E44AD]">Conditions</span>
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            Welcome to <span className="font-semibold">Find My Mate</span>. By
            accessing or using our website and services, you agree to be bound
            by these Terms & Conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            1. Eligibility
          </h2>
          <p>
            You must be at least 18 years old to use our services. By
            registering, you confirm that you meet this age requirement and are
            legally capable of entering into a binding agreement.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            2. Account Responsibility
          </h2>
          <ul className="list-disc ml-6">
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              Any activity under your account will be considered your
              responsibility.
            </li>
            <li>
              You must provide accurate and truthful information when creating
              or updating your biodata.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            3. Acceptable Use
          </h2>
          <p>When using our platform, you agree not to:</p>
          <ul className="list-disc ml-6">
            <li>Post false, misleading, or offensive information.</li>
            <li>Use the service for unlawful purposes.</li>
            <li>Harass, abuse, or harm other members.</li>
            <li>Attempt to hack, disrupt, or misuse the platform.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            4. Premium Membership & Payments
          </h2>
          <p>
            Premium services are billed through{" "}
            <span className="font-medium">Stripe</span>. All payments are final
            and non-refundable unless required by applicable law.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            5. Content & Intellectual Property
          </h2>
          <p>
            All platform content, design, and features belong to{" "}
            <span className="font-semibold">Find My Mate</span>. Users may not
            copy, distribute, or exploit content without permission.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            6. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms & Conditions or engage in harmful activities.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            7. Limitation of Liability
          </h2>
          <p>
            We are not responsible for any loss, damage, or disputes that arise
            from the use of our services or interactions between members.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            8. Changes to Terms
          </h2>
          <p>
            We may update these Terms & Conditions from time to time. Updates
            will be effective once posted on this page.
          </p>

          <h2 className="text-2xl font-semibold text-[#C2185B]">
            9. Contact Us
          </h2>
          <p>
            If you have any questions about these Terms & Conditions, please
            contact us at:{" "}
            <a
              href="mailto:hridoy1407@gmail.com"
              className="text-[#8E44AD] font-medium underline"
            >
              hridoy1407@gmail.com
            </a>
          </p>

          <p className="text-sm text-gray-500 mt-8">
            <em>Last Updated: August 2025</em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
