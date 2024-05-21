"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next"; // Import getCookie
import {
  BiSolidObjectsHorizontalLeft,
  BiSolidChevronsLeft,
  BiSolidUserCircle,
  BiInfoCircle,
  BiMessage,
  BiListCheck,
  BiDownload,
  BiHome,
  BiBed,
} from "react-icons/bi";
import { SiHotelsdotcom } from "react-icons/si";
import { IoSettings } from "react-icons/io5";

interface MenuItem {
  path: string;
  icon: JSX.Element;
  title: string;
}

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLog, setIsLog] = useState<boolean>(false);
  const defaultIconSize = "2rem";
  const pathname = usePathname();

  useEffect(() => {
    const token = getCookie("access_token");
    const user = getCookie("userName"); // Assuming the username is stored in a cookie named "userName"
    console.log(user);
    if (user) {
      setUsername(user as string);
      setIsLog(true);
    }
  }, []);

  const Menus: { title: string; list: MenuItem[] }[] = [
    {
      title: "Pages",
      list: [
        {
          title: "Home",
          path: "/",
          icon: <BiHome size={defaultIconSize} />,
        },
        {
          title: "Introduce",
          path: "#Intro",
          icon: <BiSolidObjectsHorizontalLeft size={defaultIconSize} />,
        },
        {
          title: "Explore ",
          path: "#explore",
          icon: <BiListCheck size={defaultIconSize} />,
        },
        {
          title: "Load More",
          path: "#loadmore",
          icon: <BiDownload size={defaultIconSize} />,
        },
        {
          title: isLog ? (username as string) : "Account",
          path: "/profile",
          icon: <BiSolidUserCircle size={defaultIconSize} />,
        },
      ],
    },
    {
      title: "Function",
      list: [
        {
          title: "Setting",
          path: "/setting",
          icon: <IoSettings size={defaultIconSize} />,
        },
        {
          title: "About",
          path: "/about",
          icon: <BiInfoCircle size={defaultIconSize} />,
        },
      ],
    },
  ];

  return (
    <nav
      className={`bg-sky-950 p-5 py-10 duration-300 relative ${
        open ? "w-64" : "w-24"
      }`}
    >
      <div
        className={`fixed top-2 left-4 flex items-center text-white text-3xl cursor-pointer bg-sky-950 w-24 border-sky-950 border-2 rounded-full ${
          !open && "rotate-180 top-2 left-0 z-10 "
        }`}
        onClick={() => setOpen(!open)}
      >
        <BiSolidChevronsLeft />
      </div>

      <div className="flex mt-1 items-center fixed text-yellow-400">
        <div
          className={`cursor-pointer duration-500 text-4xl ${
            open && "rotate-[360deg] "
          }`}
        >
          <SiHotelsdotcom className="mr-0" />
        </div>
        <h1
          className={`origin-left font-medium text-5xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          H
        </h1>
        <h1
          className={`origin-left font-medium text-5xl duration-200 text-green-400 ${
            !open && "scale-0"
          }`}
        >
          NP
        </h1>
      </div>
      <ul className="py-20 fixed">
        {Menus.map((cat, index) => (
          <li key={index}>
            <span className="text-gray-400 font-bold text-xs mx-2 mt-10 ">
              {cat.title}
            </span>
            {cat.list.map((item, idx) => (
              <Link
                href={item.path}
                key={idx}
                className={`flex items-center p-3 gap-2 my-2 rounded-lg text-yellow-100 ${
                  pathname === item.path
                    ? "bg-sky-900 text-white"
                    : "hover:bg-sky-900"
                }`}
              >
                {item.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
