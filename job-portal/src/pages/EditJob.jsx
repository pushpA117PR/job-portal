import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    await API.put(`/jobs/${id}`, job);
    navigate("/");
  };

  return (
    <form onSubmit={update}>
      <input value={job.title || ""} onChange={e=>setJob({...job,title:e.target.value})}/>
      <input value={job.company || ""} onChange={e=>setJob({...job,company:e.target.value})}/>
      <input value={job.location || ""} onChange={e=>setJob({...job,location:e.target.value})}/>
      <button>Update</button>
    </form>
  );
};

export default EditJob;
