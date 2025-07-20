import { motion } from "motion/react";
import { Link } from "react-router";
import { FaBug } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-rose-100 via-white to-rose-50 text-center px-6">
      <motion.div
        initial={{ rotate: -20, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-rose-600"
      >
        <FaBug className="text-[120px] mb-4 drop-shadow-xl" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-6xl font-bold text-rose-700"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-2xl mt-2 font-semibold text-gray-700"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-gray-500 mt-4 max-w-xl"
      >
        Sorry, the page you are looking for does not exist or has been moved.
        Let’s get you back to safety.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-block bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          ⬅ Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
