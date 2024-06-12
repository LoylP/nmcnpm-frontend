"use client";
import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Menu from "../../../components/Nav/Menu";
import Header from "../../../components/Nav/Header";
import { GET } from "@/app/utils";
import { Card, Typography } from "antd";
import Search from "@/components/Dashboard/search/search";
import { Space, SpaceData } from "@/components/Sample/RoomData";
import SpaceCard from "@/components/Sample/SpaceCard";


interface Service {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

interface GroupedServices {
  price: number;
  services: Service[];
}

const { Title } = Typography;
const ITEMS_PER_PAGE = 1;

const Page = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [services, setServices] = useState<GroupedServices[]>([]);
  const [filteredServices, setFilteredServices] = useState<GroupedServices[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const headerServices = [
    { name: "Home", url: "/" },
    { name: "Booking", url: "/booking" },
    { name: "Explore", url: "#" },
    { name: "Rules", url: "#" },
  ];


  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space);
  };

  const [spaceIndex, setSpaceIndex] = useState(0);
  const spaceStartIndex = spaceIndex;
  const spaceEndIndex = spaceStartIndex + ITEMS_PER_PAGE;
  const displayedSpaceImages = SpaceData.slice(spaceStartIndex, spaceEndIndex);

  const nextSpace = () => {
    if (spaceIndex < SpaceData.length - ITEMS_PER_PAGE) {
      setSpaceIndex(spaceIndex + 1);
    }
  };

  const prevSpace = () => {
    if (spaceIndex > 0) {
      setSpaceIndex(spaceIndex - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GET("v1/services");
        const groupedServices = groupByPrice(res.data);
        setServices(groupedServices);
        setFilteredServices(groupedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        setErrorMessage("Failed to fetch services. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = services.map(group => ({
      ...group,
      services: group.services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.services.length > 0);

    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const groupByPrice = (services: Service[]) => {
    const grouped = services.reduce((acc: GroupedServices[], service) => {
      const foundGroup = acc.find(group => group.price === service.price);
      if (foundGroup) {
        foundGroup.services.push(service);
      } else {
        acc.push({ price: service.price, services: [service] });
      }
      return acc;
    }, []);
    return grouped;
  };

  return (
    <div className="flex min-h-screen bg-slate-700">
      <Menu />
      <main className="flex-1">
        <div className="sticky top-0 bg-black opacity-80 text-white z-50">
          <Header services={headerServices} isUser={true} />
        </div>
        <div className="p-8">
          <Title level={2} className="text-center text-white mb-6">Our Services</Title>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <div className="flex mx-auto mb-6">
            <div className="w-[6%]"></div>
            <div className="relative overflow-hidden w-[45%]">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${spaceIndex * 100}%)` }}
              >
                {SpaceData.map((space, index) => (
                  <div key={index} className="min-w-full">
                    <SpaceCard space={space} onSpaceClick={handleSpaceClick} />
                  </div>
                ))}
              </div>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={prevSpace}
              >
                &lt;
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={nextSpace}
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between mx-10">
            <Suspense fallback={<div>Loading...</div>}>
              <Search placeholder="Search for a service..." onSearch={setSearchQuery} />
            </Suspense>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {filteredServices.map(group => (
              <Card
                key={group.price}
                title={<span className="text-green-600 font-bold">Group Service No.{group.price}</span>}
                bordered={true}
                className="w-[30%] h-60 overflow-y-auto rounded-lg overflow-hidden shadow-lg bg-slate-200"
              >
                {group.services.map(service => (
                  <p key={service.id} className="text-black">{service.name}</p>
                ))}
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
