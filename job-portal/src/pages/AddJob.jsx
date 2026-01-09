import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState({ title: "", company: "", location: "" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/jobs", { ...job, providerId: user.id });
    navigate("/jobs");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-4 flex flex-col gap-2">
      <input placeholder="Title" onChange={e => setJob({...job, title:e.target.value})} />
      <input placeholder="Company" onChange={e => setJob({...job, company:e.target.value})} />
      <input placeholder="Location" onChange={e => setJob({...job, location:e.target.value})} />
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">Add Job</button>
    </form>
  );
};

export default AddJob;
