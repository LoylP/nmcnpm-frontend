"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GET } from "@/app/utils";
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
      <main className="flex-1 md:col-span-4 bg-blue-50">
        <div className="w-full bg-banner-bg bg-center ">
          <div className="w-full bg-black opacity-60 text-white">
            <Header services={services} isUser={true} />
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
