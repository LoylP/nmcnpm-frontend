"use client";
import React, { useEffect } from "react";
import Menu from "../../../components/Nav/Menu";
import Header from "../../../components/Nav/Header";
import Info from "../../../components/Info/Info";

const Page = () => {
  const services = [
    "Home",
    "Services",
    "Explore",
    "Rule",
  ];

  return (
    <div className="flex ">
      <Menu />
      <main className="flex-1 md:col-span-4 bg-slate-700">
        <div className="w-full ">
          <div className="w-full bg-black opacity-60 text-white">
            <Header isUser={true} />
          </div>
        </div>

        <div className="px-12 py-6">
          <Info />
        </div>
      </main>
    </div>
  );
}

export default Page;
