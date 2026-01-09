import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-slate-100 px-10 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold tracking-wide">
        Job<span className="text-indigo-400">Portal</span>
      </h1>

      <div className="flex gap-6 items-center text-sm font-medium">
        <NavLink to="/" className="hover:text-indigo-400">Jobs</NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard" className="hover:text-indigo-400">Dashboard</NavLink>

            {/* Only Provider sees Post Job */}
            {user.role === "provider" && (
              <NavLink to="/add-job" className="hover:text-indigo-400">Post Job</NavLink>
            )}

            {/* Only Seeker sees Applied */}
            {user.role === "seeker" && (
              <NavLink to="/applied" className="hover:text-indigo-400">Applied</NavLink>
            )}

            <span className="text-slate-300">{user.email}</span>

            <button
              onClick={logout}
              className="bg-red-500/90 hover:bg-red-600 px-4 py-1.5 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-indigo-400">Login</NavLink>
            <NavLink to="/register" className="hover:text-indigo-400">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
