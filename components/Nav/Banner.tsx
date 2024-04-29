"use client";
import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Your trusted online hotel booking platform.",
      "Providing best user service to customers.",
      "Choose a good hotel to have a good experience.",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <div className="h-64 max-w-screen-2xl mx-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl md:text-5xl uppercase font-bold text-yellow-500">
        HOTEL BOOKING
      </h1>
      <p className="text-base md:text-lg font-semibold mt-2 text-white">
        {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
      </p>
    </div>
  );
};

export default Banner;
