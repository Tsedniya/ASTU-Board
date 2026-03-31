"use client";

import { useState } from "react";

export default function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Academic Affairs");
  const [department, setDepartment] = useState("Computer Science");
  const [cohorts, setCohorts] = useState<string[]>([]);
  const [priority, setPriority] = useState("Normal");
  const [deadline, setDeadline] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const toggleCohort = (year: string) => {
    setCohorts((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    const announcement = {
      title,
      content,
      category,
      department,
      cohorts,
      priority,
      deadline,
      files,
    };
    console.log("Publishing announcement:", announcement);
    alert("Announcement published!");
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-10">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-on-surface">
          Post Academic Announcement
        </h1>
        <p className="text-on-surface-variant mt-2 max-w-full sm:max-w-2xl text-sm sm:text-base">
          Broadcast updates to your department, specific cohorts, or the entire university. Use high-priority tags for urgent notifications.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-surface-container p-6 sm:p-8 rounded-3xl shadow-sm border border-outline-variant/10 space-y-6">
            <div className="space-y-2">
              <label className="block font-headline font-semibold text-lg text-on-surface" htmlFor="title">
                Announcement Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., End of Semester Examination Schedule"
                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-headline font-semibold text-lg text-on-surface" htmlFor="content">
                Content Detail
              </label>
              <textarea
                id="content"
                placeholder="Compose the message here..."
                rows={10}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block font-headline font-semibold text-lg text-on-surface">
                Attach Files
              </label>
              <input type="file" multiple onChange={handleFileChange} className="w-full text-on-surface" />
              {files.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {files.map((file, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-surface-container-low px-3 py-2 rounded-lg">
                      <span className="truncate">{file.name}</span>
                      <button onClick={() => handleRemoveFile(idx)} className="text-error font-bold px-2">
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        {/* Configuration Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Classification */}
          <section className="bg-surface-container p-4 sm:p-6 rounded-3xl border border-outline-variant/10 space-y-6">
            <h3 className="font-headline font-bold text-primary flex items-center gap-2">Classification</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Category</label>
                <select
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-on-surface appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Academic Affairs</option>
                  <option>Student Life</option>
                  <option>Events & Workshops</option>
                  <option>Facilities</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Department</label>
                <select
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-on-surface appearance-none"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Business School</option>
                  <option>Humanities</option>
                  <option>All Departments</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Year / Cohort</label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {["Year 1", "Year 2", "Year 3", "Year 4"].map((year) => (
                    <label
                      key={year}
                      className="flex items-center gap-2 bg-surface-container-high px-2 sm:px-3 py-2 rounded-lg cursor-pointer hover:bg-surface-container-highest transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-primary focus:ring-primary/20 bg-surface-dim"
                        checked={cohorts.includes(year)}
                        onChange={() => toggleCohort(year)}
                      />
                      <span className="text-sm">{year}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Priority & Deadline */}
          <section className="bg-surface-container p-4 sm:p-6 rounded-3xl border border-outline-variant/10 space-y-6">
            <h3 className="font-headline font-bold text-primary flex items-center gap-2">Urgency & Timing</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Priority Level</label>
                <div className="flex flex-wrap gap-2">
                  {["Urgent", "Normal", "Low"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setPriority(level)}
                      className={`flex-1 sm:flex-none py-2 sm:py-3 px-2 sm:px-3 rounded-xl border text-xs font-bold uppercase flex flex-col items-center gap-1 ${
                        level === "Urgent"
                          ? "border-error-container text-on-error-container bg-error-container/10 hover:bg-error-container/20"
                          : level === "Normal"
                          ? "border-primary-container text-on-primary-container bg-primary-container/20 hover:ring-2 hover:ring-primary"
                          : "border-outline-variant/20 text-on-surface-variant bg-surface-container-high hover:bg-surface-container-highest"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Removal Deadline</label>
                <input
                  type="date"
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-on-surface focus:ring-2 focus:ring-primary/20"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <p className="text-[10px] text-outline italic">
                  Announcement will be archived after this date.
                </p>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handlePublish}
              className="w-full py-4 sm:py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-headline font-extrabold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Publish Now
            </button>
            <button className="w-full py-3 sm:py-4 rounded-full bg-surface-variant text-on-surface font-headline font-bold border border-outline-variant/10 hover:bg-surface-container-highest transition-all">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}