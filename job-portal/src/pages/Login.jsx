import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get("/users");
      const user = res.data.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (!user) return alert("Invalid email or password");

      login(user);
      if (user.role === "provider") navigate("/provider-dashboard");
      else navigate("/seeker-dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white w-[360px] p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-slate-800 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500 mb-6">Login to your account</p>

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border px-3 py-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
