const inputStyle =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

const textareaStyle = `${inputStyle} min-h-28 resize-y leading-6`;

const sectionTitleStyle =
  "text-lg font-black tracking-tight text-slate-950";

const labelStyle = "mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500";

const addButtonStyle =
  "mt-3 min-h-11 w-full rounded-xl bg-cyan-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-900/15 transition hover:-translate-y-0.5 hover:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-cyan-100 sm:w-auto";

const deleteButtonStyle =
  "min-h-11 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100";

function Field({ label, className = "", children }) {
  return (
    <label className={className}>
      <span className={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

function SectionHeader({ title, count }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
      <h2 className={sectionTitleStyle}>{title}</h2>
      {typeof count === "number" && (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
          {count}
        </span>
      )}
    </div>
  );
}

function ResumeForm({ formData, setFormData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (index, e) => {
    const values = [...formData.education];
    values[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      education: values,
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          college: "",
          year: "",
        },
      ],
    });
  };

  const removeEducation = (indexToRemove) => {
    const updatedEducation =
      formData.education.filter(
        (_, index) => index !== indexToRemove
      );
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  const handleProjectChange = (index, e) => {
    const values = [...formData.projects];
    values[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      projects: values,
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: "",
          tech: "",
          description: "",
        },
      ],
    });
  };

  const removeProject = (indexToRemove) => {
    const updatedProjects =
      formData.projects.filter(
        (_, index) => index !== indexToRemove
      );
    setFormData({
      ...formData,
      projects: updatedProjects
    })
  }
  const handleExperienceChange = (index, e) => {
    const values = [...formData.experience];
    values[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      experience: values,
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: "",
          role: "",
          duration: "",
          description: ""
        },
      ],
    });
  };

  const removeExperience = (indexToRemove) => {
    const updatedExperience =
      formData.experience.filter(
        (_, index) => index !== indexToRemove
      );
    setFormData({
      ...formData,
      experience: updatedExperience
    })
  }

  return (
    <section className="w-full rounded-[1.5rem] border border-white/80 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-6 lg:p-7">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
            Editor
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            Resume Details
          </h2>
        </div>

        <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
          {["modern", "professional"].map((template) => (
            <button
              key={template}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  template,
                })
              }
              className={`min-h-10 rounded-xl px-4 text-sm font-bold capitalize transition focus:outline-none focus:ring-4 focus:ring-cyan-100 ${
                formData.template === template
                  ? "bg-white text-cyan-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
          <SectionHeader title="Personal Information" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full Name">
              <input
                type="text"
                name="name"
                placeholder="Mohit Jain"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
              />
            </Field>

            <Field label="Email Address">
              <input
                type="email"
                name="email"
                placeholder="mohit@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
              />
            </Field>

            <Field label="Phone Number">
              <input
                type="text"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
              />
            </Field>

            <Field label="LinkedIn URL">
              <input
                type="text"
                name="linkedin"
                placeholder="linkedin.com/in/your-profile"
                value={formData.linkedin}
                onChange={handleChange}
                className={inputStyle}
              />
            </Field>

            <Field label="Professional Summary" className="md:col-span-2">
              <textarea
                name="summary"
                placeholder="Write a concise summary of your experience, strengths, and goals."
                value={formData.summary}
                onChange={handleChange}
                rows="5"
                className={textareaStyle}
              />
            </Field>

            <Field label="Skills" className="md:col-span-2">
              <input
                type="text"
                name="skills"
                placeholder="React, Node.js, MongoDB, Tailwind CSS"
                value={formData.skills}
                onChange={handleChange}
                className={inputStyle}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <SectionHeader title="Education" count={formData.education.length} />
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-bold text-slate-700">Education {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem]">
                  <Field label="Degree">
                    <input
                      type="text"
                      name="degree"
                      placeholder="B.Tech Computer Science"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, e)
                      }
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="College">
                    <input
                      type="text"
                      name="college"
                      placeholder="College Name"
                      value={edu.college}
                      onChange={(e) =>
                        handleEducationChange(index, e)
                      }
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="Year">
                    <input
                      type="text"
                      name="year"
                      placeholder="2026"
                      value={edu.year}
                      onChange={(e) =>
                        handleEducationChange(index, e)
                      }
                      className={inputStyle}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addEducation}
            className={addButtonStyle}
          >
            Add Education
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <SectionHeader title="Projects" count={formData.projects.length} />
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-bold text-slate-700">Project {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Project Title">
                    <input
                      type="text"
                      name="title"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="ResumeAI Builder"
                      className={inputStyle}
                    />
                  </Field>
                  <Field label="Tech Stack">
                    <input
                      type="text"
                      name="tech"
                      value={project.tech}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="React, Express, MongoDB"
                      className={inputStyle}
                    />
                  </Field>
                  <Field label="Description" className="md:col-span-2">
                    <textarea
                      name="description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="Describe the project impact, features, and your contribution."
                      rows="4"
                      className={textareaStyle}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addProject}
            className={addButtonStyle}
          >
            Add Project
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <SectionHeader title="Experience" count={formData.experience.length} />
          <div className="space-y-4">
            {formData.experience.map((experience, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-bold text-slate-700">Experience {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Company">
                    <input
                      type="text"
                      name="company"
                      value={experience.company}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Company Name"
                      className={inputStyle}
                    />
                  </Field>
                  <Field label="Role">
                    <input
                      type="text"
                      name="role"
                      value={experience.role}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Frontend Developer"
                      className={inputStyle}
                    />
                  </Field>
                  <Field label="Duration">
                    <input
                      type="text"
                      name="duration"
                      value={experience.duration}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Jan 2025 - Present"
                      className={inputStyle}
                    />
                  </Field>
                  <Field label="Description" className="md:col-span-2">
                    <textarea
                      name="description"
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Highlight responsibilities, achievements, and measurable outcomes."
                      rows="4"
                      className={textareaStyle}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addExperience}
            className={addButtonStyle}
          >
            Add Experience
          </button>
        </div>
      </div>
    </section>
  );
}

export default ResumeForm;
