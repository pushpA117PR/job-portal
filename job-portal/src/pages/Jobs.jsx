import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    API.get("/jobs")
      .then((res) => {
        setJobs(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const applyJob = async (job) => {
    try {
      await API.post("/appliedJobs", {
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
        jobLocation: job.location,
        seekerId: user.id,
        providerId: job.providerId,
        status: "Applied",
        appliedAt: new Date().toLocaleDateString()
      });
      alert("Applied successfully!");
    } catch {
      alert("Failed to apply");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await API.delete(`/jobs/${id}`);
    setJobs(jobs.filter(j => j.id !== id));
  };

  if (!user) return <div className="p-6">Loading user...</div>;
  if (loading) return <div className="p-6">Loading jobs...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      {user.role === "provider" && (
        <button
          onClick={() => navigate("/add-job")}
          className="bg-green-600 text-white px-4 py-2 rounded mb-6"
        >
          Post Job
        </button>
      )}

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="bg-white p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} • {job.location}</p>

            <div className="mt-3">
              {user.role === "seeker" && (
                <button
                  onClick={() => applyJob(job)}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Apply
                </button>
              )}

              {user.role === "provider" && (
                <button
                  onClick={() => deleteJob(job.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
