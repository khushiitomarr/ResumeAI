import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);
console.log(response.data);
      // Save JWT Token
      localStorage.setItem("token", response.data.token);

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-cyan-100 to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-8 text-center text-4xl font-black text-slate-900">
          ResumeAI
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-900 py-3 font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;