import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdSearchOff } from "react-icons/md";

const AllBiodatas = () => {
  const axiosSecure = useAxiosSecure();

  const [filters, setFilters] = useState({
    biodataType: "",
    division: "",
    minAge: "",
    maxAge: "",
  });

  const { data: biodatas = [], isLoading } = useQuery({
    queryKey: ["biodatas", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas", { params: filters });
      return res.data;
    },
    keepPreviousData: true,
  });
  // console.log(biodatas);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-8"
    >
      {/* Filter Section */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="col-span-1 bg-white shadow-md p-4 rounded space-y-4"
      >
        <h2 className="text-xl font-bold text-[#C2185B]">Filter Biodatas</h2>

        <div>
          <label className="block font-semibold">Biodata Type</label>
          <select
            name="biodataType"
            value={filters.biodataType}
            onChange={handleFilterChange}
            className="select select-bordered w-full"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Division</label>
          <select
            name="division"
            value={filters.division}
            onChange={handleFilterChange}
            className="select select-bordered w-full"
          >
            <option value="">All</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Age Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minAge"
              value={filters.minAge}
              onChange={handleFilterChange}
              placeholder="Min"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="maxAge"
              value={filters.maxAge}
              onChange={handleFilterChange}
              placeholder="Max"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Biodata List Section */}
      <div className="col-span-1 md:col-span-3">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {biodatas.length === 0 ? (
                <motion.div
                  key="no-result"
                  className="col-span-full flex flex-col items-center justify-center text-center text-gray-500 py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <MdSearchOff className="text-6xl text-[#C2185B] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No Biodatas Found
                  </h3>
                  <p className="max-w-md text-sm">
                    We couldn't find any biodatas that match your current
                    filters. Try adjusting the filter options to see more
                    results.
                  </p>
                </motion.div>
              ) : (
                biodatas.map((biodata) => (
                  <motion.div
                    key={biodata._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white shadow-lg rounded-md overflow-hidden"
                  >
                    <img
                      src={biodata.image}
                      alt={biodata.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 space-y-1">
                      <p>
                        <strong>ID:</strong> {biodata.biodataId}
                      </p>
                      <p>
                        <strong>Type:</strong> {biodata.biodataType}
                      </p>
                      <p>
                        <strong>Division:</strong> {biodata.permanentDivision}
                      </p>
                      <p>
                        <strong>Age:</strong> {biodata.age}
                      </p>
                      <p>
                        <strong>Occupation:</strong> {biodata.occupation}
                      </p>

                      <NavLink
                        to={`/biodata-details/${biodata._id}`}
                        className="block text-center mt-3 w-full bg-[#C2185B] hover:bg-[#8E44AD] text-white font-semibold py-2 rounded"
                      >
                        View Profile
                      </NavLink>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AllBiodatas;
