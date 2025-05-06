import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-col flex-1 bg-gray-50">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold">Mobile App</h1>
        </main>
      </div>
    </div>
  );
}
