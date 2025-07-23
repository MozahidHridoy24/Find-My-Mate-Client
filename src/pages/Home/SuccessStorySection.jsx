import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

const SuccessStorySection = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // default descending

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const res = await axios.get(
        "https://find-my-mate-server.vercel.app/success-story"
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Sort based on selected order
  const sortedStories = [...stories].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.marriageDate) - new Date(b.marriageDate)
      : new Date(b.marriageDate) - new Date(a.marriageDate)
  );

  return (
    <section className="py-20">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-rose-700 text-center">
          Success Stories 💖
        </h2>
        <div className=" m-8 flex justify-start items-center">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedStories.map((story, index) => (
            <motion.div
              key={story._id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Couple Image */}
              <div className="h-48 w-full rounded-md overflow-hidden mb-4">
                <img
                  src={story.image}
                  alt="Couple"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Marriage Date */}
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-gray-800">Married on:</span>{" "}
                {new Date(story.marriageDate).toLocaleDateString()}
              </p>

              {/* Star Rating */}
              <div className="flex items-center text-yellow-500 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700">
                "
                {story.review.length > 160
                  ? story.review.slice(0, 160) + "..."
                  : story.review}
                "
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStorySection;
