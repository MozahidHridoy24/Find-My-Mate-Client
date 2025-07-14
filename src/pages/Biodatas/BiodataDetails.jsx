import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const BiodataDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: biodata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !biodata) {
    return (
      <div className="text-center text-red-500 py-10 font-semibold">
        Failed to load biodata.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10"
    >
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8">
        <motion.img
          src={biodata.image}
          alt={biodata.name}
          className="w-full md:w-1/3 h-72 object-cover rounded-lg shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold text-[#C2185B]">{biodata.name}</h2>
          <p>
            <span className="font-semibold">Type:</span> {biodata.biodataType}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {biodata.age}
          </p>
          <p>
            <span className="font-semibold">Occupation:</span>{" "}
            {biodata.occupation}
          </p>
          <p>
            <span className="font-semibold">Race:</span> {biodata.race}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6 mt-8"
      >
        <div className="space-y-2">
          <p>
            <strong>Permanent Division:</strong> {biodata.permanentDivision}
          </p>
          <p>
            <strong>Present Division:</strong> {biodata.presentDivision}
          </p>
          <p>
            <strong>Date of Birth:</strong> {biodata.dob}
          </p>
          <p>
            <strong>Height:</strong> {biodata.height} ft
          </p>
          <p>
            <strong>Weight:</strong> {biodata.weight} kg
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Father’s Name:</strong> {biodata.fathersName}
          </p>
          <p>
            <strong>Mother’s Name:</strong> {biodata.mothersName}
          </p>
          <p>
            <strong>Phone:</strong> {biodata.phone}
          </p>
          <p>
            <strong>Email:</strong> {biodata.email}
          </p>
        </div>
      </motion.div>

      {/* Expected Partner Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-[#F9F9FB] p-4 rounded-lg border-l-4 border-[#C2185B]"
      >
        <h3 className="text-xl font-semibold text-[#C2185B] mb-2">
          Expected Partner
        </h3>
        <p>
          <strong>Age:</strong> {biodata.expectedPartnerAge}
        </p>
        <p>
          <strong>Height:</strong> {biodata.expectedPartnerHeight}
        </p>
        <p>
          <strong>Weight:</strong> {biodata.expectedPartnerWeight}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BiodataDetails;
