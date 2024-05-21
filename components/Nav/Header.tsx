"use client";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Buttons from "../Buttons/Buttons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SiHotelsdotcom } from "react-icons/si";
import { GrUserAdmin } from "react-icons/gr";
import { getCookie } from "cookies-next";
import Link from "next/link";

const Header = ({
  services,
  isUser,
}: {
  services: string[];
  isUser: boolean;
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLog, setIsLog] = useState<boolean>(false);
  useEffect(() => {
    const token = getCookie("access_token");
    const user = getCookie("userName"); // Assuming the username is stored in a cookie named "userName"
    console.log(user);
    if (user) {
      setUsername(user as string);
      setIsLog(true);
    }
  }, []);

  return (
    <nav className="w-full h-20 lg:h-20 text-black bg-slate-950 lg:text-green-400">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center">
        {!isUser && (
          <div className="flex items-center text-yellow-400 text-3xl mr-20 ml-5">
            <SiHotelsdotcom />
            <p className="ml-0">H</p>
            <p className="ml-0 text-green-500">NP</p>
          </div>
        )}

        <div className="text-2xl uppercase font-bold mx-20"></div>
        <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
          {services.map((service, index) => (
            <li
              key={index}
              className="regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {service}
            </li>
          ))}
        </ul>
        {isLog ? (
          <>
            <div className="hidden lg:inline-flex gap-8 items-center text-black ml-auto">
              <BsSearch className="text-xl hover:text-hoverColor text-white" />
              <Link href="../profile">
                {" "}
                <div className="text-white font-semibold">{username}</div>
              </Link>
            </div>
            <div className="inline-flex lg:hidden">
              <FiMenu className="text-3xl text-white" />
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:inline-flex gap-8 items-center text-black ml-auto">
              <BsSearch className="text-xl hover:text-hoverColor text-white" />
              <Buttons />
            </div>
            <div className="inline-flex lg:hidden">
              <FiMenu className="text-3xl text-white" />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
