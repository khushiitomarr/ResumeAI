import { useEffect, useRef, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const initialState = {
  title: "",
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  summary: "",
  skills: "",
  template: "modern",

  education: [
    {
      degree: "",
      college: "",
      year: "",
    },
  ],

  projects: [
    {
      title: "",
      tech: "",
      description: "",
    },
  ],

  experience: [
    {
      company: "",
      role: "",
      duration: "",
      description: "",
    },
  ],
};

const normalizeResumeData = (resume = {}) => ({
  ...initialState,
  ...resume,
  skills: Array.isArray(resume.skills)
    ? resume.skills.join(", ")
    : resume.skills || "",
  education: Array.isArray(resume.education)
    ? resume.education
    : initialState.education,
  projects: Array.isArray(resume.projects)
    ? resume.projects
    : initialState.projects,
  experience: Array.isArray(resume.experience)
    ? resume.experience
    : initialState.experience,
  template: resume.template || initialState.template,
});

const buildResumePayload = (formData) => ({
  title:
    formData.title?.trim() ||
    formData.name?.trim() ||
    "Untitled Resume",
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  linkedin: formData.linkedin,
  summary: formData.summary,
  skills: formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean),
  template: formData.template,
  education: formData.education,
  projects: formData.projects,
  experience: formData.experience,
});

const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");

    if (!savedData) {
      return initialState;
    }

    try {
      return normalizeResumeData(JSON.parse(savedData));
    } catch {
      localStorage.removeItem("resumeData");
      return initialState;
    }
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resumeData");
    navigate("/login", { replace: true });
  };

  const clearForm = () => {

    const confirmClear = window.confirm(
      "Are you sure you want to clear the resume?"
    );

    if (!confirmClear) return;

    setFormData(initialState);

    localStorage.removeItem("resumeData");
  };

  useEffect(() => {
    localStorage.setItem(
      "resumeData",
      JSON.stringify(formData)
    );
  }, [formData]);

  const resumeRef = useRef();

  const downloadPDF = async () => {
    const element = resumeRef.current;

    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();

    const height =
      (canvas.height * width) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      width,
      height
    );

    pdf.save("Resume.pdf");
  };

  const saveResume = async () => {
    try {
      setSaving(true);
      setStatus("");

      const response = await api.post(
        "/resumes",
        buildResumePayload(formData)
      );

      localStorage.removeItem("resumeData");
      setStatus("Resume saved successfully.");
      navigate(`/resume/${response.data.resume._id}`, { replace: true });
    } catch (error) {
      setStatus(error.response?.data?.message || "Failed to save resume.");
    } finally {
      setSaving(false);
    }
  };

  const updateResume = async () => {
    if (!id) {
      await saveResume();
      return;
    }

    try {
      setSaving(true);
      setStatus("");

      const response = await api.put(
        `/resumes/${id}`,
        buildResumePayload(formData)
      );

      setFormData(normalizeResumeData(response.data.resume));
      setStatus("Resume updated successfully.");
    } catch (error) {
      setStatus(error.response?.data?.message || "Failed to update resume.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    let active = true;

    const getResumeById = async () => {
      try {
        const response = await api.get(`/resumes/${id}`);

        if (active) {
          setFormData(normalizeResumeData(response.data.resume));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getResumeById();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-5 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4 flex justify-end gap-3">
          <Link
            to="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:text-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={logout}
            className="min-h-11 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
          >
            Logout
          </button>
        </div>

        <header className="mb-6 rounded-[2rem] border border-white/80 bg-white/75 px-5 py-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">
                Resume Builder
              </p>
              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                ResumeAI
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                Shape a polished resume with live preview, saved progress, and one-click PDF export.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
              <button
                onClick={id ? updateResume : saveResume}
                disabled={saving}
                className="min-h-12 rounded-xl bg-cyan-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-900/20 transition hover:-translate-y-0.5 hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
              >
                {saving
                  ? "Saving..."
                  : id
                    ? "Update Resume"
                    : "Save Resume"}
              </button>
              <button
                onClick={downloadPDF}
                className="min-h-12 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 sm:px-5"
              >
                Download PDF
              </button>
              <button
                onClick={clearForm}
                className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-100 sm:px-5"
              >
                Clear Form
              </button>
            </div>
          </div>
          {status && (
            <p className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
              {status}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] xl:items-start">
          <ResumeForm
            formData={formData}
            setFormData={setFormData}
          />
          <ResumePreview
            formData={formData}
            resumeRef={resumeRef}
          />
        </div>
      </div>
    </main>
  );
};


export default ResumeEditor;
