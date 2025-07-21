import React from "react";
import { FaHeart, FaUserCheck, FaLock, FaUserFriends } from "react-icons/fa";
import { motion } from "motion/react";

const AboutUs = () => {
  return (
    <div>
      <title>Find My Mate || About</title>
      <section className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-rose-100 py-16 px-4">
        <div className="w-11/12 mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-[#C2185B] mb-6"
          >
            About <span className="text-[#8E44AD]">Us</span>
          </motion.h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700  mb-12">
            Welcome to <strong className="text-[#C2185B]">FindMyMate</strong>, a
            trusted platform connecting hearts and helping individuals find
            their perfect life partners. Whether you're searching for love,
            companionship, or a shared future, we're here to make your journey
            secure, respectful, and meaningful.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Feature Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-[#C2185B]"
            >
              <FaHeart className="text-[#C2185B] text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">
                Matchmaking with Purpose
              </h3>
              <p>
                We focus on genuine biodatas with real intentions for lifelong
                partnerships.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white  p-6 rounded-xl shadow-lg border border-[#8E44AD]"
            >
              <FaUserCheck className="text-[#8E44AD] text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Verified Users</h3>
              <p>
                Our platform ensures user authentication and optional premium
                verification for added trust.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white  p-6 rounded-xl shadow-lg border border-[#C2185B]"
            >
              <FaLock className="text-[#C2185B] text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p>
                Your data and contact information are secured and visible only
                to premium or approved users.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white  p-6 rounded-xl shadow-lg border border-[#8E44AD]"
            >
              <FaUserFriends className="text-[#8E44AD] text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p>
                We provide tools and dashboards to help users manage requests,
                favorites, and success stories.
              </p>
            </motion.div>
          </div>

          {/* Mission Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-[#C2185B]">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 ">
              MatrimonyMatch was created to bring together like-minded
              individuals who value culture, integrity, and commitment. We aim
              to make matrimonial matchmaking respectful, modern, and
              emotionally fulfilling — with the help of secure technology and a
              user-first experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
