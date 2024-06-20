"use client";
import React, { useEffect, useState } from "react";
import Menu from "../../../components/Nav/Menu";
import Header from "../../../components/Nav/Header";
import Booking from "../../../components/Booking/Booking";

const Page = () => {
  const services = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/service" },
    { name: "Explore", url: "/explore" },
    { name: "Rules", url: "/rule" },
  ];


  return (
    <div className="flex ">
      <Menu />
      <main className="flex-1 md:col-span-4 bg-slate-500">

        <div className="px-12 py-6">
          <Booking />
        </div>
      </main>
    </div>
  );
}

export default Page;
