"use client";

import { useState } from "react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [announcements, setAnnouncements] = useState([
    {
      type: "Urgent",
      title: "Midterm Exam Reschedule: CS301",
      description:
        "The Data Structures midterm originally scheduled for Friday has been moved to Monday at 10:00 AM in Hall B.",
      department: "CS",
      timestamp: "2 hours ago",
      read: false,
      saved: false,
    },
    {
      type: "Normal",
      title: "Guest Lecture: AI in Healthcare",
      description:
        "Join Dr. Smith for an insightful session on the future of medical technology.",
      department: "General",
      timestamp: "Today",
      read: false,
      saved: false,
    },
    {
      type: "Low",
      title: "Library 24/7 Access for Finals",
      description:
        "Starting next Monday, the main library will remain open 24 hours a day for finals prep.",
      department: "Campus Services",
      timestamp: "Yesterday",
      read: false,
      saved: false,
    },
  ]);

  // Toggle read status
  const markAsRead = (idx) => {
    setAnnouncements((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, read: true } : a))
    );
  };

  // Toggle saved status
  const toggleSaved = (idx) => {
    setAnnouncements((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, saved: !a.saved } : a))
    );
  };

  // Filter announcements based on active tab
  let filteredAnnouncements = announcements.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Exams") return item.title.toLowerCase().includes("exam");
    if (activeTab === "Events") return item.title.toLowerCase().includes("lecture");
    if (activeTab === "Saved") return item.saved;
    return true;
  });

  // Sort by priority: Urgent → Normal → Low
  const priorityOrder = { Urgent: 1, Normal: 2, Low: 3 };
  filteredAnnouncements.sort((a, b) => priorityOrder[a.type] - priorityOrder[b.type]);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Hi, Alex</h1>
          <span className="text-xs uppercase font-semibold bg-primary-container/30 text-primary py-1 rounded-full">
            Student - 3 Year
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {["All", "Exams", "Events", "Saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeTab === tab
                    ? "bg-gray-300 text-on-primary border-primary border-none"
                    : "bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-container-high"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Announcements */}
          <div className="space-y-6">
            {filteredAnnouncements.map((item, idx) => (
              <div
                key={idx}
                onClick={() => markAsRead(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer hover:bg-surface-container-highest/40 ${
                  item.read ? "bg-surface-container/60" : "bg-surface-container-high"
                }`}
              >
                <div className="flex justify-between mb-2 items-center">
                  <span
                    className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                      item.type === "Urgent"
                        ? "bg-error/10 text-error"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-on-surface-variant">{item.timestamp}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(idx);
                      }}
                      className={`text-sm ${
                        item.saved ? "text-primary font-bold" : "text-on-surface-variant"
                      }`}
                      title={item.saved ? "Unsave" : "Save"}
                    >
                      ⭐
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-on-surface mb-2">{item.title}</h3>

                <p className="text-sm text-on-surface-variant">{item.description}</p>
              </div>
            ))}

            {filteredAnnouncements.length === 0 && (
              <p className="text-sm text-on-surface-variant">No announcements found.</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE (Deadlines) */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="font-headline font-bold text-md mb-4 text-primary">
              Deadlines Soon
            </h3>
            {announcements.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center ${
                    item.type === "Urgent"
                      ? "bg-error/10 text-error"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <span className="text-[10px] font-bold leading-none">OCT</span>
                  <span className="text-lg font-bold leading-none">24</span>
                </div>
                <div>
                  <p className="text-sm font-bold truncate w-32">{item.title}</p>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">
                    {item.type === "Urgent" ? "In 12 hours" : "In 2 days"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}