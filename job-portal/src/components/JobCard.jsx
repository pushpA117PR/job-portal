import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const JobCard = ({ job, onApply, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div className="border p-4 rounded shadow mb-4 bg-white dark:bg-gray-900">
      <h3 className="font-bold text-lg">{job.title}</h3>
      <p>{job.company} - {job.location}</p>

      <div className="mt-2 flex gap-2">
        {user.role === "seeker" && (
          <button onClick={() => onApply(job)} className="bg-blue-600 text-white px-3 py-1 rounded">
            Apply
          </button>
        )}

        {user.role === "provider" && (
          <>
            <button onClick={() => onEdit(job.id)} className="bg-yellow-500 px-3 py-1 rounded">
              Edit
            </button>
            <button onClick={() => onDelete(job.id)} className="bg-red-500 px-3 py-1 rounded">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
