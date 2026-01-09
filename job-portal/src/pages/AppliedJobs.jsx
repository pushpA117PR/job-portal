import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    API.get("/appliedJobs").then((res) => {
      const filtered =
        user.role === "seeker"
          ? res.data.filter(j => j.seekerId === user.id)
          : res.data.filter(j => j.providerId === user.id);

      setAppliedJobs(filtered);
      setLoading(false);
    });
  }, [user]);

  const withdrawApplication = async (id) => {
    if (!window.confirm("Withdraw this application?")) return;

    await API.delete(`/appliedJobs/${id}`);
    setAppliedJobs(appliedJobs.filter(j => j.id !== id));
  };

  if (loading) return <div className="p-6">Loading applied jobs...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>

      {appliedJobs.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        appliedJobs.map(job => (
          <div key={job.id} className="bg-white p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
            <p className="text-gray-600">
              {job.jobCompany} • {job.jobLocation}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                Applied on: {job.appliedAt || "Recently"}
              </span>

              <div className="flex gap-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {job.status || "Applied"}
                </span>

                {user.role === "seeker" && (
                  <button
                    onClick={() => withdrawApplication(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppliedJobs;
