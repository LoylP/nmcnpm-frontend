"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Buttons from "../Buttons/Buttons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SiHotelsdotcom } from "react-icons/si";
import { GrUserAdmin } from "react-icons/gr";

const Header = ({
  services,
  isUser,
}: {
  services: string[];
  isUser: boolean;
}) => {
  return (
    <nav className="w-full h-20 lg:h-20  text-black bg-slate-950 lg:text-green-400 ">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center ">
        {isUser ? (
          <></>
        ) : (
          <>
            <div className=" flex items-center text-yellow-400 text-3xl mr-20 ml-5">
              <SiHotelsdotcom />
              <p className="ml-0">H</p>
              <p className="ml-0 text-green-500 ">NP</p>
            </div>
          </>
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
        {isUser ? (
          <>
            <div className="hidden lg:inline-flex gap-8 items-center text-black ml-auto ">
              <BsSearch className="text-xl hover:text-hoverColor text-white" />
              <Buttons />
            </div>
            <div className="inline-flex lg:hidden">
              <FiMenu className="text-3xl text-white" />
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:inline-flex gap-4 items-center text-gray-600 ml-auto ">
              <button className="btn bg-gray-100 flex items-center  hover:text-hoverColor  hover:text-white">
                <BsSearch className="text-xl " />
                <p className=" ml-5">Search</p>
              </button>
              <button className="btn rounded-full bg-gray-100 p-2 hover:text-hoverColor hover:text-white">
                <IoMdNotificationsOutline className="text-xl" />
              </button>
              <button className="btn rounded-full bg-gray-100 p-2 hover:text-hoverColor hover:text-white">
                <GrUserAdmin className="text-xl" />
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
