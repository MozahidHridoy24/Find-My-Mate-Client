import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", "User promoted to Admin.", "success");
      refetch();
    }
  };

  const handleMakePremium = async (id) => {
    const res = await axiosSecure.patch(`/users/premium/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", "User upgraded to Premium.", "success");
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by username"
          className="border p-2 rounded w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded shadow text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Make Admin</th>
              <th className="p-3 border-b">Make Premium</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="p-3">
                  {user.role === "premium" ? (
                    <span className="text-purple-600 font-semibold">
                      Premium
                    </span>
                  ) : user.isPremiumRequest ? (
                    <button
                      onClick={() => handleMakePremium(user._id)}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
                    >
                      Make Premium
                    </button>
                  ) : (
                    <span className="text-gray-400 italic text-sm">
                      No Request
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
