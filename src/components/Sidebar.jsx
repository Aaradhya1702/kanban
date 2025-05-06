import { Drawer, Divider } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const projects = [
  { id: 0, name: "Mobile App", color: "#7AC555" },
  { id: 1, name: "Website Redesign", color: "#FFA500" },
  { id: 2, name: "Design System", color: "#E4CCFD" },
  { id: 3, name: "Wireframes", color: "#76A5EA" },
];

function MyProjectsSidebar() {
  const [selectedKey, setSelectedKey] = useState(0);

  return (
    <div className="py-4 px-2 space-y-6">
      <div className="flex justify-between items-center text-xs text-[#787486] font-medium">
        <span>MY PROJECTS</span>
        <AddIcon style={{ fontSize: 16 }} className="cursor-pointer" />
      </div>

      <div className="space-y-3 text-sm font-medium">
        {projects.map((project) => {
          const isSelected = selectedKey === project.id;

          return (
            <div
              key={project.id}
              onClick={() => setSelectedKey(project.id)}
              className={`cursor-pointer flex items-center justify-between rounded-md transition-colors duration-200 ${
                isSelected ? "p-3 bg-[#5030E514]" : "px-2 py-1"
              }`}
            >
              <div className={`flex items-center gap-2 justify-start w-full`}>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span
                  className={isSelected ? "text-[#0D062D]" : "text-[#787486]"}
                >
                  {project.name}
                </span>
              </div>
              {isSelected && (
                <MoreHorizIcon
                  style={{ fontSize: 18 }}
                  className="text-[#0D062D] cursor-pointer"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-[#F5F5F5] rounded-xl p-4 text-center relative">
        <div className="absolute top-[-25px] bg-[#F5F5F5] rounded-full left-1/2 transform -translate-x-1/2">
          {/* Glowy Background */}
          <div className="absolute w-[70px] h-[70px] bg-[#FCD64A] opacity-30 rounded-full blur-xl z-[-1]" />

          {/* Lamp Container */}
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full">
            <img src="/lamp-on.png" alt="lamp" className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold text-sm text-[#0D062D] mb-2">
            Thoughts Time
          </p>
          <p className="text-xs text-[#787486] mb-4">
            We don’t have any notice for you, till then you can share your
            thoughts with your peers.
          </p>
          <button className="text-xs font-medium bg-white px-3 py-1.5 rounded">
            Write a message
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({ className = "" }) {
  return (
    <ul className={`p-4 space-y-7 text-[rgba(120, 116, 134, 1)] ${className}`}>
      <li className="flex cursor-pointer items-center gap-2">
        <img alt="home" src="/category.png" />
        <span>Home</span>
      </li>
      <li className="flex cursor-pointer items-center gap-2">
        <img src="/message.png" alt="message" />
        <span>Messages</span>
      </li>
      <li className="flex cursor-pointer items-center gap-2">
        <img src="/task-square.png" alt="tasks" />
        <span>Tasks</span>
      </li>
      <li className="flex cursor-pointer items-center gap-2">
        <img src="/profile-2user.png" alt="Members" />
        <span>Members</span>
      </li>
      <li className="flex cursor-pointer items-center gap-2">
        <img src="/setting-2.png" alt="Settings" />
        <span>Settings</span>
      </li>
    </ul>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        className="md:hidden"
      >
        <div className="w-64">
          <div className="flex justify-between items-center">
            <div
              style={{ borderBottom: "1px solid rgba(219, 219, 219, 1)" }}
              className="flex justify-between items-center w-full p-4"
            >
              <div className="flex items-center space-x-2">
                <img alt="logo" src="/logo.png" className="w-[30px] h-[30px]" />
                <h2 className="text-xl font-bold">Project M.</h2>
              </div>
              <CloseIcon onClick={onClose} className="cursor-pointer" />
            </div>
          </div>
          <div className="p-4 overflow-y-auto">
            <SidebarNav />
            <Divider sx={{ color: "rgba(219, 219, 219, 1)" }} />
            <MyProjectsSidebar />
          </div>
        </div>
      </Drawer>
      <div
        className="hidden md:flex md:flex-col w-64 bg-white h-full"
        style={{ borderRight: "1px solid rgba(219, 219, 219, 1)" }}
      >
        <div
          style={{ borderBottom: "1px solid rgba(219, 219, 219, 1)" }}
          className="flex px-3 justify-between items-center"
        >
          <div className="flex p-4 items-center space-x-2">
            <img alt="logo" src="/logo.png" className="w-[30px] h-[30px]" />
            <h2 className="text-xl font-bold">Project M.</h2>
          </div>
          <KeyboardDoubleArrowLeftIcon color="#787486" />
        </div>
        <div className="p-4 overflow-y-auto">
          <SidebarNav />
          <Divider sx={{ color: "rgba(219, 219, 219, 1)" }} />
          <MyProjectsSidebar />
        </div>
      </div>
    </>
  );
}
