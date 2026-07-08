import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const getResumes = async () => {
      try {
        const response = await api.get("/resumes");

        if (active) {
          setResumes(response.data.resumes || []);
          setError("");
        }
      } catch (error) {
        if (active) {
          setError(error.response?.data?.message || "Failed to load resumes");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    getResumes();

    return () => {
      active = false;
    };
  }, []);

  const deleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/resumes/${id}`);
      setResumes((currentResumes) =>
        currentResumes.filter((resume) => resume._id !== id)
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete resume");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resumeData");
    navigate("/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-black text-slate-950">Dashboard</h1>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/create"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-950"
            >
              Create Resume
            </Link>
            <button
              type="button"
              onClick={logout}
              className="min-h-11 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
            >
              Logout
            </button>
          </div>
        </div>

        {loading && (
          <p className="mt-6 text-sm text-slate-600">Loading resumes...</p>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && resumes.length === 0 && (
          <p className="mt-6 text-sm text-slate-600">No resumes found.</p>
        )}

        {!loading && !error && resumes.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <article
                key={resume._id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h2 className="text-lg font-bold text-slate-900">
                  {resume.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  {resume.summary || "No summary added yet."}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Created: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/resume/${resume._id}`}
                    className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-cyan-700"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteResume(resume._id)}
                    className="min-h-10 flex-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
