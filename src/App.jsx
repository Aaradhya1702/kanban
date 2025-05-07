import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HeaderSection from "./components/MainHeader";
import KanbanBoard from "./kanban/KanbanBoard";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-col flex-1 bg-white">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="p-6 overflow-y-auto">
          <HeaderSection />
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}
