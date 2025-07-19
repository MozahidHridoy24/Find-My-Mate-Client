import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const PremiumMemberBiodata = () => {
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: premiumBiodatas = [], isLoading } = useQuery({
    queryKey: ["premium-biodatas"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/all-biodatas`);
      return res.data.filter((biodata) => biodata.premiumStatus === "approved");
    },
  });

  // Sort the biodatas by age based on selected order
  const sortedBiodatas = [...premiumBiodatas]
    .sort((a, b) => (sortOrder === "asc" ? a.age - b.age : b.age - a.age))
    .slice(0, 6); // Take only 6 members

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="py-10">
      <div className="w-11/12 mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-rose-700 mb-6">
          Premium Members Profile
        </h2>

        {/* Sort Dropdown */}
        <div className="flex justify-end mb-4">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="asc">Sort by Age: Ascending</option>
            <option value="desc">Sort by Age: Descending</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedBiodatas.map((biodata) => (
            <div
              key={biodata._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={
                  biodata.image ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt="Profile"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <p className="text-gray-700 font-medium flex items-center gap-2">
                  <FaUser className="text-rose-700" /> ID:{" "}
                  <span className="font-semibold">{biodata.biodataId}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Type:{" "}
                  <span className="font-semibold">{biodata.biodataType}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Division:{" "}
                  <span className="font-semibold">
                    {biodata.permanentDivision}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Age: <span className="font-semibold">{biodata.age}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Occupation:{" "}
                  <span className="font-semibold">{biodata.occupation}</span>
                </p>

                <Link
                  to={`/biodata-details/${biodata._id}`}
                  className="inline-block w-full text-center mt-3 bg-rose-700 hover:bg-rose-900 text-white font-semibold py-1.5 rounded transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMemberBiodata;
