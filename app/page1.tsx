import Image from "next/image";
import React from "react";
import LoginPage from "./Login/LoginPage";
import Nav from "../components/Nav";
import "./page.css";
import Buttons from "../components/Buttons";
import Header from "../components/Header";
import Sample from "../components/Sample";
import RegisterPage from "@/app/Register/RegisterPage";

function Page1() {
  return (
    <div className="grid md:grid-cols-5">
      <RegisterPage />
    </div>
  );
}

export default Page1;
