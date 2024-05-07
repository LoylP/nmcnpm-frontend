"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Buttons from "../Buttons/Buttons";

const Navbar = ({
  services,
  isUser,
}: {
  services: string[];
  isUser: boolean;
}) => {
  return (
    <div className="w-full h-20 border-b-[1px] lg:h-20 border-gray-500 text-black lg:text-green-400">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl uppercase font-bold "></div>
        <ul className="hidden lg:inline-flex items-center gap-8 uppercase text-sm font-semibold">
          {services.map((service, index) => (
            <li key={index} className="navbarLi">
              {service}
            </li>
          ))}
        </ul>
        {isUser ? (
          <>
            <div className="hidden lg:inline-flex gap-8 items-center text-black ">
              <BsSearch className="text-xl hover:text-hoverColor text-white" />
              <Buttons />
            </div>
            <div className="inline-flex lg:hidden">
              <FiMenu className="text-3xl text-white" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
