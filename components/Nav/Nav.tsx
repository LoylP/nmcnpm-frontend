"use client";
import { useState } from "react";
import {
  BiSolidChevronsLeft,
  BiHomeAlt,
  BiSearchAlt,
  BiSolidUserCircle,
  BiInfoCircle,
  BiMessage,
  BiMenu,
  BiFile,
  BiBed,
} from "react-icons/bi";
import { SiHotelsdotcom } from "react-icons/si";
import { IoSettings } from "react-icons/io5";

const Index = () => {
  const [open, setOpen] = useState(true);
  const defaultIconSize = "2rem";
  const Menus = [
    { title: "Home", icon: <BiHomeAlt size={defaultIconSize} /> },
    { title: "Inbox", icon: <BiMessage size={defaultIconSize} /> },
    {
      title: "Accounts",
      icon: <BiSolidUserCircle size={defaultIconSize} />,
      gap: true,
    },
    { title: "Room ", icon: <BiBed size={defaultIconSize} /> },
    { title: "Search", icon: <BiSearchAlt size={defaultIconSize} /> },
    { title: "About", icon: <BiInfoCircle size={defaultIconSize} /> },
    { title: "Files ", icon: <BiFile size={defaultIconSize} />, gap: true },
    { title: "Setting", icon: <IoSettings size={defaultIconSize} /> },
  ];

  return (
    <nav
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-sky-950 p-5 py-10 duration-300 relative`}
    >
      <div
        className={`fixed top-2 left-4 flex items-center text-white text-3xl cursor-pointer bg-sky-950 w-24 border-sky-950 border-2 rounded-full ${
          !open && "rotate-180 top-2 left-0 z-10"
        }`}
        onClick={() => setOpen(!open)}
      >
        <BiSolidChevronsLeft />
      </div>

      <div className="flex gap-x-4 mt-2 items-center fixed text-yellow-400">
        <div
          className={`cursor-pointer duration-500 text-3xl  ${
            open && "rotate-[360deg]"
          }`}
        >
          <SiHotelsdotcom className="mr-2" />
        </div>
        <h1
          className={` origin-left font-medium text-3xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          HNP.com
        </h1>
      </div>
      <ul className="py-12 fixed ">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-500 text-yellow-100 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            <div>{Menu.icon}</div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Index;
