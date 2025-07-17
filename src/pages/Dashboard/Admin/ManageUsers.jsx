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
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, promote",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User promoted to Admin.", "success");
        refetch();
      }
    }
  };

  const handleMakePremium = async (email) => {
    const confirm = await Swal.fire({
      title: "Approve Premium Request?",
      text: `This will upgrade ${email} to premium.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, upgrade",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/users/make-premium/${email}`);
      if (
        res.data.updateUser?.modifiedCount > 0 ||
        res.data.updateBiodata?.modifiedCount > 0
      ) {
        Swal.fire("Success!", "User upgraded to Premium.", "success");
        refetch();
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this user?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/users/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "User has been removed.", "success");
        refetch();
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#C2185B]">
        Manage Users
      </h2>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 p-3 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded shadow-lg bg-white">
          <thead className="bg-[#8E44AD] text-white text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Admin</th>
              <th className="p-3 text-center">Premium</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>

                {/* Admin */}
                <td className="p-3 text-center">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Make Admin
                    </button>
                  )}
                </td>

                {/* Premium */}
                <td className="p-3 text-center">
                  {user.role === "premium" ? (
                    <span className="text-purple-600 font-semibold">
                      Premium
                    </span>
                  ) : user.isPremiumRequested ? (
                    <button
                      onClick={() => handleMakePremium(user.email)}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                    >
                      Approve Request
                    </button>
                  ) : (
                    <span className="text-gray-400 italic">No Request</span>
                  )}
                </td>

                {/* Delete */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
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
