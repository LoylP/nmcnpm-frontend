import Image from "next/image";
import React from "react";
import Menu from "../../components/Nav/Menu";
import "./page.css";
import Intro from "../../components/Intro/Intro";
import Sample from "../../components/Sample/Sample";
import Header from "../../components/Nav/Header";
import Banner from "../../components/Nav/Banner";
import Footer from "@/components/Footer/Footer";
import { getCookie } from "cookies-next";

function Page() {
  const services = [
    "Đặt phòng",
    "Thuê xe",
    "Dịch vụ",
    "Địa điểm tham quan",
    "Quy tắc chung",
  ];

  return (
    <div className="flex ">
      <Menu />
      <main className="flex-1 md:col-span-4 bg-blue-50">
        <div className="w-full bg-banner-bg bg-center ">
          <div className="w-full bg-black opacity-60 text-white">
            <Header services={services} isUser={true} />
            <Banner />
          </div>
        </div>

        <div className="px-12 py-6">
          <Intro />
        </div>
        <div className="px-12 py-6">
          <Sample />
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Page;
