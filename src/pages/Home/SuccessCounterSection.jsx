import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaVenus, FaMars, FaHeart } from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "motion/react";
import LoadingSpinner from "../../components/LoadingSpinner";

const SuccessCounterSection = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const counters = [
    {
      icon: <FaUsers size={35} />,
      title: "Total Biodatas",
      value: stats.totalBiodata || 0,
      color: "text-rose-700",
    },
    {
      icon: <FaMars size={35} />,
      title: "Boys Biodata",
      value: stats.maleCount || 0,
      color: "text-blue-600",
    },
    {
      icon: <FaVenus size={35} />,
      title: "Girls Biodata",
      value: stats.femaleCount || 0,
      color: "text-rose-600",
    },
    {
      icon: <FaHeart size={35} color="red" />,
      title: "Successful Marriages",
      value: stats.successCount || 0,
      color: "text-purple-700",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-rose-50 via-rose-50 to-purple-50">
      <h2 className="text-4xl font-bold text-center text-rose-700 mb-12">
        Success at a Glance
      </h2>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {counters.map((counter, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-all duration-300"
          >
            <div className={`mb-4 ${counter.color} flex justify-center`}>
              {counter.icon}
            </div>
            <p className="text-4xl font-bold text-rose-700">
              <CountUp
                start={0}
                end={counter.value}
                duration={5}
                separator=","
              />
              +
            </p>
            <p className="text-rose-800 font-bold mt-2">{counter.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCounterSection;
