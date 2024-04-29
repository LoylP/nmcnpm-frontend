import Image from "next/image";
import React from "react";
import LoginPage from "./(auth)/login/LoginPage";
import RegisterPage from "./(auth)/register/RegisterPage";
import Nav from "../components/Nav/Nav";
import "./page.css";
import Buttons from "../components/Buttons/Buttons";
import Header from "../components/Header/Header";
import Sample from "../components/Sample/Sample";
import Navbar from "../components/Nav/Navbar";
import Banner from "../components/Nav/Banner";

function Page() {
  return (
    <div className="flex ">
      <Nav />
      <main className="flex-1 md:col-span-4 bg-blue-50">
        <div className="w-full bg-banner-bg bg-center ">
          <div className="w-full bg-black opacity-60 text-white">
            <Navbar />
            <Banner />
          </div>
        </div>

        <div className="px-12 py-6">
          <Header />
        </div>
        <div className="px-12 py-6">
          <Sample />
        </div>
      </main>
    </div>
  );
}

export default Page;
