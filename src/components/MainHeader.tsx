import React from "react";
import { Avatar, Divider, Button, AvatarGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";
import { BsCalendarDate } from "react-icons/bs";
import GroupIcon from "@mui/icons-material/Group";
import { HiOutlineViewList } from "react-icons/hi";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { LuLayoutDashboard } from "react-icons/lu";

const people = [
  "/Ellipse 12.png",
  "/Ellipse 13.png",
  "/Ellipse 14.png",
  "/Ellipse 15.png",
  "/Ellipse 17.png",
];

export default function HeaderSection() {
  return (
    <div className="flex items-center flex-wrap gap-6 justify-between w-full px-4 py-2">
      <div className="flex flex-col items-start gap-5">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold px-1">Mobile App</h1>
          <div className="flex gap-3">
            <Button
              variant="outlined"
              sx={{ backgroundColor: "#5030E533" }}
              className="p-1"
            >
              <EditIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{ backgroundColor: "#5030E533" }}
              className="p-1"
            >
              <LinkIcon />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            sx={{ color: "#787486", borderColor: "#787486" }}
            className="flex items-center gap-2"
          >
            <FilterAltIcon />
            Filter
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#787486", borderColor: "#787486" }}
            className="flex items-center gap-2"
          >
            <BsCalendarDate />
            Today
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4">
        <div className="flex items-center gap-4">
          <button className="text-[#5030E5] flex items-center">
            <AddIcon />
            Invite
          </button>
          <AvatarGroup max={4}>
            {people.map((src, i) => (
              <Avatar
                key={i}
                alt={`person-${i}`}
                src={src}
                sx={{ width: 40, height: 40 }}
              />
            ))}
          </AvatarGroup>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outlined"
            sx={{ color: "#787486", borderColor: "#787486" }}
          >
            <GroupIcon />
            Share
          </Button>
          <Divider orientation="vertical" flexItem />
          <div className="flex items-center gap-3">
            <button className="bg-[#5030E5] p-2 rounded-sm">
              <img alt="pause" src="/pause.png" />
            </button>
            <button>
              <img alt="menu" src="/menu.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
