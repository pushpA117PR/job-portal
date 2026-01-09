import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const url =
      user.role === "provider"
        ? `/jobs?providerId=${user.id}`
        : "/jobs";

    API.get(url)
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // 🔍 Search & filter logic
  useEffect(() => {
    let result = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    );

    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [search, location, jobs]);

  const applyJob = async (job) => {
    try {
      await API.post("/appliedJobs", {
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
        jobLocation: job.location,
        seekerId: user.id,
        providerId: job.providerId,
      });
      alert("Applied successfully!");
    } catch {
      alert("Failed to apply");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    await API.delete(`/jobs/${id}`);
    setJobs(jobs.filter((j) => j.id !== id));
  };

  if (!user) return <div className="p-6">Loading user...</div>;
  if (loading) return <div className="p-6">Loading jobs...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      {/* 🔍 Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search by title or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-4 py-2 rounded"
        />

        <input
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded"
        />
      </div>

      {user.role === "provider" && (
        <button
          onClick={() => navigate("/add-job")}
          className="bg-green-600 text-white px-4 py-2 rounded mb-6"
        >
          Post New Job
        </button>
      )}

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            className="mb-6 p-5 bg-white rounded shadow"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">
              {job.company} • {job.location}
            </p>

            <div className="mt-4 flex gap-3">
              {/* 👨‍💼 Seeker */}
              {user.role === "seeker" && (
                <button
                  onClick={() => applyJob(job)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded"
                >
                  Apply
                </button>
              )}

              {/* 🏢 Provider */}
              {user.role === "provider" && (
                <>
                  <button
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
