import UserHome from "./User/UserHome";
import AdminHome from "./Admin/AdminHome";
import useRole from "../../hooks/UseRole";

const Dashboard = () => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-rose-600 w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div>
      {role === "user" || role === "premium" ? (
        <UserHome />
      ) : role === "admin" ? (
        <AdminHome />
      ) : (
        <p className="text-center mt-10 text-red-500">Invalid user role.</p>
      )}
    </div>
  );
};

export default Dashboard;
