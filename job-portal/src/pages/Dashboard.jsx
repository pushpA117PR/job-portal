import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md text-center mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Welcome back, <span className="text-indigo-600">{user.email.split("@")[0]}</span>!
      </h1>

      <p className="text-gray-700 text-lg mb-4">
        You are logged in as a{" "}
        <span className="font-semibold text-gray-900">
          {user.role === "provider" ? "Job Provider" : "Job Seeker"}
        </span>.
      </p>

      <p className="text-gray-500 text-sm">
        {user.role === "provider"
          ? "Use the portal to post and manage your job openings."
          : "Explore available jobs and apply to your favorite opportunities."}
      </p>
    </div>
  );
};

export default Dashboard;
