import { Outlet, NavLink, useNavigate } from "react-router";
import useRole from "../hooks/UseRole";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [role, isLoading] = useRole();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "block text-purple-300 font-semibold"
      : "block hover:text-purple-200";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#C2185B]/90 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <NavLink to="/dashboard/home" className={linkClass}>
            Home
          </NavLink>

          {/* User routes */}
          {role === "user" && (
            <>
              <NavLink to="/dashboard/edit-biodata" className={linkClass}>
                Edit Biodata
              </NavLink>
              <NavLink to="/dashboard/view-biodata" className={linkClass}>
                View Biodata
              </NavLink>
              <NavLink
                to="/dashboard/my-contact-requests"
                className={linkClass}
              >
                My Contact Request
              </NavLink>
              <NavLink to="/dashboard/favourites" className={linkClass}>
                Favourites Biodata
              </NavLink>
              <NavLink to="/dashboard/got-married" className={linkClass}>
                Got Married
              </NavLink>
            </>
          )}

          {/* Premium routes */}
          {role === "premium" && (
            <>
              <NavLink to="/dashboard/edit-biodata" className={linkClass}>
                Edit Biodata
              </NavLink>
              <NavLink to="/dashboard/view-biodata" className={linkClass}>
                View Biodata
              </NavLink>
              <NavLink to="/dashboard/favourites" className={linkClass}>
                Favourites Biodata
              </NavLink>
              <NavLink to="/dashboard/got-married" className={linkClass}>
                Got Married
              </NavLink>
            </>
          )}

          {/* Admin routes */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={linkClass}>
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/approved-premium" className={linkClass}>
                Approved Premium
              </NavLink>
              <NavLink
                to="/dashboard/approved-contact-request"
                className={linkClass}
              >
                Approved Contact Request
              </NavLink>
              <NavLink
                to="/dashboard/success-story"
                className={linkClass}
              >
                All Success Story
              </NavLink>
            </>
          )}

          <NavLink
            onClick={handleLogout}
            to="/"
            className="block text-rose-300 hover:text-white mt-4"
          >
            Logout
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
