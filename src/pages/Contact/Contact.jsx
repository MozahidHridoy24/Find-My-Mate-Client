import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can integrate EmailJS, FormSubmit, or send to your backend
    alert("Thanks for contacting us! We'll get back to you shortly.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <title>Find My Mate || Contact</title>

      <section className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 px-6 py-16">
        <div className="w-11/12 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-center text-[#C2185B] mb-4"
          >
            Contact <span className="text-[#8E44AD]">Us</span>
          </motion.h2>
          <p className="text-center text-gray-700  mb-12 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about
            features, pricing, feedback, or anything else — our team is ready to
            answer!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 justify-center"
            >
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-2xl text-[#C2185B]" />
                <p className="text-lg">+880 1234 567890</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-2xl text-[#8E44AD]" />
                <p className="text-lg">support@findmymate.com</p>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-2xl text-[#C2185B]" />
                <p className="text-lg">Dhaka, Bangladesh</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="bg-white  shadow-xl rounded-xl p-8 space-y-6 border border-[#C2185B]"
            >
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-md border focus:outline-none border-[#C2185B] "
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-md border focus:outline-none border-[#8E44AD] "
              />
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-md border focus:outline-none border-[#C2185B] "
              />
              <button
                type="submit"
                className="w-full bg-[#C2185B] hover:bg-[#8E44AD] text-white py-3 rounded-md font-semibold transition"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
