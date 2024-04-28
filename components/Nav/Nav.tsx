"use client";
import { useState } from "react";
import {
  BiSolidChevronsLeft,
  BiHomeAlt,
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
    { title: "Search", icon: <BiHomeAlt size={defaultIconSize} /> },
    { title: "About", icon: <BiInfoCircle size={defaultIconSize} /> },
    { title: "Files ", icon: <BiFile size={defaultIconSize} />, gap: true },
    { title: "Setting", icon: <IoSettings size={defaultIconSize} /> },
  ];

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-sky-950 p-5  pt-8 relative duration-300`}
    >
      <div
        className={`absolute text-white text-2xl cursor-pointer -right-3 bg-black top-9 w-7 border-sky-950 border-2 rounded-full ${
          !open && "rotate-180 bg-black"
        }`}
        onClick={() => setOpen(!open)}
      >
        <BiSolidChevronsLeft />
      </div>
      <div className="flex gap-x-4 items-center">
        <div
          className={`cursor-pointer duration-500 text-3xl text-white ${
            open && "rotate-[360deg]"
          }`}
        >
          <SiHotelsdotcom />
        </div>
        <h1
          className={`text-white origin-left font-medium text-3xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          HNP.com
        </h1>
        <BiMenu
          className="cursor-pointer md:hidden"
          size={defaultIconSize}
          onClick={() => setOpen(!open)}
        />
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-500 text-gray-300 text-sm items-center gap-x-4 
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
    </div>
  );
};

export default Index;
