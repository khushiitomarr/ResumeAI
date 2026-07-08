import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios'

const inputStyle =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(
        "/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-8">
      <form
        onSubmit={handleSubmit}

        className="w-full max-w-md rounded-2xl border border-white/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Create Account
        </h1>
        <div className="mt-6 grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className={inputStyle}
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="abc@example.com"
            className={inputStyle}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={inputStyle}
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="min-h-12 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
          >
            {
              loading
                ?
                "Registering..."
                :
                "Register"
            }
          </button>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-cyan-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Register;
