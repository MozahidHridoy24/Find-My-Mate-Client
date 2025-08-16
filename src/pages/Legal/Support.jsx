import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support form submitted:", formData);

    // SweetAlert popup
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thanks for contacting support! We'll get back to you shortly.",
      confirmButtonColor: "#C2185B",
      timer: 2000, // auto close after 2 seconds
      timerProgressBar: true,
    });

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#C2185B] mb-8">
          Support <span className="text-[#8E44AD]">Center</span>
        </h1>

        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto text-lg">
          Need help? Fill out the form below or use our contact information. Our
          support team is here to assist you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-2xl text-[#C2185B]" />
              <p className="text-lg">+880 1234 567890</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-2xl text-[#8E44AD]" />
              <p className="text-lg">support@findmymate.com</p>
            </div>
            <div className="flex items-center gap-4">
              <FaQuestionCircle className="text-2xl text-[#C2185B]" />
              <p className="text-lg">
                For urgent inquiries, please mention "URGENT" in the subject.
              </p>
            </div>
          </div>

          {/* Support Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl p-8 space-y-6 border border-[#C2185B]"
          >
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-md border focus:outline-none border-[#C2185B]"
            />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-md border focus:outline-none border-[#8E44AD]"
            />
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-md border focus:outline-none border-[#C2185B]"
            />
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-md border focus:outline-none border-[#C2185B]"
            />
            <button
              type="submit"
              className="w-full bg-[#C2185B] hover:bg-[#8E44AD] text-white py-3 rounded-md font-semibold transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Support;
