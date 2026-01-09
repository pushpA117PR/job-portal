import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "seeker" // default role
  });

  const submit = async (e) => {
    e.preventDefault();

    // check password match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/users", form); // register user
      alert("Registration successful! Please login.");
      navigate("/login"); // go to login page
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh]">
      <form
        onSubmit={submit}
        className="bg-white w-[360px] p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-slate-800 mb-1">
          Create account
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Register to apply for jobs
        </p>

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-slate-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-slate-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full border border-slate-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full border border-slate-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="seeker">Job Seeker</option>
          <option value="provider">Job Provider</option>
        </select>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
