import { useEffect, useRef, useState } from "react"
import ResumeForm from "./components/ResumeForm"
import ResumePreview from "./components/ResumePreview"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const App = () => {

  const initialState = {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    skills: "",
    template: "modern",

    education: [{
      degree: "",
      college: "",
      year: "",
    }],

    projects: [{
      title: "",
      tech: "",
      description: "",
    }],

    experience: [{
      company: "",
      role: "",
      duration: "",
      description: "",
    }]
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData ? JSON.parse(savedData) : initialState;
  });

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
      'resumeData',
      JSON.stringify(formData)
    );
  }, [formData])

  const resumeRef = useRef();

  const downloadPDF = async () => {
    const element = resumeRef.current;

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

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-5 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
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
  )
}

export default App
