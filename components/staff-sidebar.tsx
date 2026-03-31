"use client";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-72 bg-[#17172f]/95 backdrop-blur-xl flex-col p-6 rounded-r-3xl text-white">
      <h2 className="font-bold text-xl mb-1 text-white">The Curator</h2>
      <p className="text-on-surface-variant text-xs mb-6 text-white">University Portal</p>

      <nav className="flex-1 space-y-2">
        <a className="flex items-center gap-3 px-4 py-3 text-primary bg-primary/10 rounded-lg">
          <span className="material-symbols-outlined text-white">Dashboard</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant rounded-lg hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-white"> Feed</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant rounded-lg hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-white">Saved</span> 
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant rounded-lg hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-white">Settings</span>
        </a>
      </nav>

      <div className="mt-auto flex items-center gap-3 p-3 bg-surface-container-low rounded-2xl">
        <div className=" text-white w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-on-primary">
          AR
        </div>
        <div>
          <p className="text-on-surface font-bold text-sm text-white">Alex Rivera</p>
          <p className="text-on-surface-variant text-xs text-white">Computer Science</p>
        </div>
      </div>
    </aside>
  );
}