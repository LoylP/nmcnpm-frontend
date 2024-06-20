"use client";
import React, { useState } from "react";
import Image from "next/image";
import Menu from "../../../components/Nav/Menu";
import Header from "../../../components/Nav/Header";
import { Explore, ExploreData } from "@/components/Sample/RoomData";
import ExploreCard from "@/components/Sample/ExploreCard";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 1;

const Page = () => {
  const [selectedExplore, setSelectedExplore] = useState<Explore | null>(null);
  const handleExploreClick = (explore: Explore) => {
    setSelectedExplore(explore);
  };
  const [exploreIndex, setExploreIndex] = useState(0);
  const router = useRouter();

  const headerServices = [
    { name: "Home", url: "/" },
    { name: "Booking", url: "/booking" },
    { name: "Service", url: "/service" },
    { name: "Rules", url: "/rule" },
  ];

  const nextExplore = () => {
    if (exploreIndex < ExploreData.length - ITEMS_PER_PAGE) {
      setExploreIndex(exploreIndex + 1);
    }
  };

  const prevExplore = () => {
    if (exploreIndex > 0) {
      setExploreIndex(exploreIndex - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-700">
      <Menu />
      <main className="flex-1">
        <div className="sticky top-0 bg-black opacity-80 text-white z-50">
          <Header services={headerServices} isUser={true} />
        </div>
        <div className="p-8">
          <h2 className="text-center text-yellow-400 font-bold mb-6">The spaces around our hotel
          </h2>

          <div className="flex mb-6">
            <div className="mx-auto relative overflow-hidden w-[70%]">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${exploreIndex * 100}%)` }}
              >
                {ExploreData.map((explore, index) => (
                  <div key={index} className="min-w-full">
                    <ExploreCard explore={explore} onExploreClick={handleExploreClick} />
                  </div>
                ))}
              </div>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={prevExplore}
              >
                &lt;
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={nextExplore}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="flex mb-6 flex-wrap justify-center">
            {ExploreData.map((explore, index) => (
              <div key={index} className="m-2 cursor-pointer" onClick={() => setExploreIndex(index)}>
                <Image src={explore.src} alt={explore.title} width={40} height={40} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
