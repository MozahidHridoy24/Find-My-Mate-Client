import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ViewBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loadingPremium, setLoadingPremium] = useState(false);

  const {
    data: biodata,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["viewBiodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleMakePremium = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Send your biodata for premium approval?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#C2185B",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, send it!",
    });

    if (result.isConfirmed) {
      try {
        setLoadingPremium(true);
        const res = await axiosSecure.put(
          `/biodatas/premium-request/${biodata._id}`
        );
        if (res.data.modifiedCount > 0) {
          Swal.fire("Sent!", "Your request has been sent to admin.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Oops!", "Something went wrong!", "error");
      } finally {
        setLoadingPremium(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-xl rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-[#C2185B] mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        My Biodata
      </motion.h2>

      <div className="grid gap-6 grid-cols-1">
        <div className="flex justify-center">
          <img
            src={biodata.image}
            alt="Profile"
            className="w-[80%] h-60 rounded-xl object-cover border-4 border-[#8E44AD]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Biodata Type", biodata.biodataType],
            ["Name", biodata.name],
            ["DOB", biodata.dob],
            ["Height", biodata.height],
            ["Weight", biodata.weight],
            ["Age", biodata.age],
            ["Occupation", biodata.occupation],
            ["Race (Skin color)", biodata.race],
            ["Father's Name", biodata.fatherName],
            ["Mother's Name", biodata.motherName],
            ["Permanent Division", biodata.permanentDivision],
            ["Present Division", biodata.presentDivision],
            ["Expected Partner Age", biodata.expectedPartnerAge],
            ["Expected Partner Height", biodata.expectedPartnerHeight],
            ["Expected Partner Weight", biodata.expectedPartnerWeight],
            ["Email", biodata.email],
            ["Phone", biodata.mobile],
          ].map(([label, value], i) => (
            <motion.div
              key={label}
              className="bg-[#F8F6F9] p-4 rounded-md shadow-sm"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="font-medium text-[#8E44AD]">{label}:</p>
              <p className="text-gray-800">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {!biodata?.premium && (
        <div className="mt-10 text-center">
          <button
            onClick={handleMakePremium}
            className="bg-[#C2185B] hover:bg-[#8E44AD] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-60"
            disabled={loadingPremium}
          >
            {loadingPremium ? "Sending Request..." : "Make Biodata Premium"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ViewBiodata;
