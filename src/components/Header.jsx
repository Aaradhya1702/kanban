import { IconButton, Avatar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ onMenuClick }) {
  return (
    <header
      className="flex items-center justify-between px-4 py-3 bg-white"
      style={{ borderBottom: "1px solid rgba(219, 219, 219, 1)" }}
    >
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <IconButton onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        </div>
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="py-2 pr-2 pl-10 text-[15px] rounded-md bg-[#F5F5F5] min-w-sm max-w-md outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center">
        <IconButton>
          <img alt="calendar-2" src="/calendar-2.png" />
        </IconButton>
        <IconButton>
          <img alt="message-question" src="/message-question.png" />
        </IconButton>
        <IconButton>
          <img alt="notification" src="/notification.png" />
        </IconButton>
        <Avatar src="/profile.jpg" />
      </div>
    </header>
  );
}
