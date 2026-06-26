const sectionHeadingStyle =
  "mb-3 border-b-2 pb-2 text-sm font-black uppercase tracking-[0.18em]";

const cardStyle = "rounded-xl border p-4";

function ResumePreview({ formData, resumeRef }) {
  const isProfessional = formData.template === "professional";
  const accentClass = isProfessional ? "border-slate-800 text-slate-950" : "border-cyan-600 text-cyan-800";
  const chipClass = isProfessional
    ? "border border-slate-200 bg-slate-100 text-slate-700"
    : "border border-cyan-100 bg-cyan-50 text-cyan-800";

  return (
    <aside className="xl:sticky xl:top-6">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
            Live Preview
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            A4 Resume
          </h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold capitalize text-slate-500 shadow-sm">
          {formData.template}
        </span>
      </div>

      <section
        ref={resumeRef}
        className={`resume-preview-capture w-full overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] ${
          isProfessional ? "p-7 sm:p-9" : "p-5 sm:p-7"
        }`}
      >
        <div
          className={`min-w-0 break-words ${
            isProfessional ? "space-y-6" : "space-y-5"
          }`}
        >
          <header
            className={`${
              isProfessional
                ? "border-b-4 border-slate-900 pb-5"
                : "rounded-2xl bg-slate-950 p-5 text-white"
            }`}
          >
            <h1
              className={`text-3xl font-black tracking-tight sm:text-4xl ${
                isProfessional ? "text-slate-950" : "text-white"
              }`}
            >
              {formData.name || "Your Name"}
            </h1>

            <div
              className={`mt-4 grid gap-2 text-sm leading-6 sm:grid-cols-2 ${
                isProfessional ? "text-slate-600" : "text-slate-200"
              }`}
            >
              <p>{formData.email || "your@email.com"}</p>
              <p>{formData.phone || "+91 XXXXX XXXXX"}</p>
              <p className="sm:col-span-2">
                {formData.linkedin || "linkedin.com/in/yourprofile"}
              </p>
            </div>
          </header>

          <section>
            <h2 className={`${sectionHeadingStyle} ${accentClass}`}>
              Professional Summary
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {formData.summary || "Your professional summary"}
            </p>
          </section>

          <section>
            <h2 className={`${sectionHeadingStyle} ${accentClass}`}>
              Skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills
                .split(",")
                .filter((skills) => skills.trim())
                .map((skills, index) => (
                  <span
                    key={index}
                    className={`max-w-full rounded-full px-3 py-1.5 text-xs font-bold ${chipClass}`}
                  >
                    {skills.trim()}
                  </span>
                ))}
              {!formData.skills.trim() && (
                <p className="text-sm text-slate-600">
                  Your skills
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className={`${sectionHeadingStyle} ${accentClass}`}>
              Education
            </h2>
            <div className="space-y-3">
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className={`${cardStyle} border-slate-200 bg-slate-50`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-black text-slate-900">
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-sm font-bold text-slate-500">
                      {edu.year || "Year"}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">
                    {edu.college || "College Name"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={`${sectionHeadingStyle} ${accentClass}`}>
              Projects
            </h2>
            <div className="space-y-3">
              {formData.projects.map((project, index) => (
                <div
                  key={index}
                  className={`${cardStyle} border-slate-200 bg-white`}
                >
                  <h3 className="text-lg font-black text-slate-900">
                    {project.title || "Project title"}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-slate-600">
                    {project.tech || "Tech Stack"}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {project.description || "Description"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={`${sectionHeadingStyle} ${accentClass}`}>
              Experience
            </h2>
            <div className="space-y-3">
              {formData.experience.map((experience, index) => (
                <div
                  key={index}
                  className={`${cardStyle} border-slate-200 bg-white`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-black text-slate-900">
                        {experience.company || "Company name"}
                      </h3>
                      <p className="text-sm font-bold text-slate-600">
                        {experience.role || "Company role"}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-slate-500">
                      {experience.duration || "Duration"}
                    </p>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {experience.description || "Description"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </aside>
  );
}

export default ResumePreview;
