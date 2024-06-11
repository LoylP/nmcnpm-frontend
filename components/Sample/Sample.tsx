"use client";
import Image from "next/image";
import RoomCard from "./RoomCard";
import SpaceCard from "./SpaceCard";
import { RoomData, Room } from "./RoomData";
import { SpaceData, Space } from "./RoomData";
import { useState } from "react";

const ITEMS_PER_PAGE = 1;

const Sample = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space);
  };

  // Pagination states for room images
  const [roomIndex, setRoomIndex] = useState(0);
  const roomStartIndex = roomIndex;
  const roomEndIndex = roomStartIndex + ITEMS_PER_PAGE;
  const displayedRoomImages = RoomData.slice(roomStartIndex, roomEndIndex);

  // Pagination states for space images
  const [spaceIndex, setSpaceIndex] = useState(0);
  const spaceStartIndex = spaceIndex;
  const spaceEndIndex = spaceStartIndex + ITEMS_PER_PAGE;
  const displayedSpaceImages = SpaceData.slice(spaceStartIndex, spaceEndIndex);

  const nextRoom = () => {
    if (roomIndex < RoomData.length - ITEMS_PER_PAGE) {
      setRoomIndex(roomIndex + 1);
    }
  };

  const prevRoom = () => {
    if (roomIndex > 0) {
      setRoomIndex(roomIndex - 1);
    }
  };

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

  return (
    <>
      <div className="">
        <h1 id="explore" className=" text-cyan-900">
          <a href="#explore">Explore the spaces here</a>
        </h1>
      </div>
      <h3 className="border-b border-primary mt-6 mb-6 pb-4">
        (Images are for illustrative purposes only.)
      </h3>
      <div className="flex mx-auto">
        <div className="w-[2%]"></div>
        <div className="relative overflow-hidden w-[45%]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${roomIndex * 100}%)` }}
          >
            {RoomData.map((room, index) => (
              <div key={index} className="min-w-full">
                <RoomCard room={room} onRoomClick={handleRoomClick} />
              </div>
            ))}
          </div>
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            onClick={prevRoom}
          >
            &lt;
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            onClick={nextRoom}
          >
            &gt;
          </button>
        </div>
        {selectedRoom && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedRoom(null)} // Đóng boxup khi nhấp vào nền đen
          >
            <div className="bg-white p-6 rounded-lg flex" onClick={(e) => e.stopPropagation()}>
              <div className="w-5/12 mr-4">
                <div className="relative h-full">
                  <Image
                    src={selectedRoom.src}
                    alt={selectedRoom.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="w-7/12">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedRoom.title} - {selectedRoom.type}
                </h2>
                <div className="overflow-y-auto max-h-80">
                  <h3>Thông tin</h3>
                  <div>
                    <div>Diện tích: ???</div>
                  </div>
                  <h3>Mô tả</h3>
                  <div>
                    <p>
                      Đầy đủ tiện nghi và hệ thống cách âm giúp khách thoải mái tự
                      do không bị làm phiền
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
        {selectedSpace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg  ">
              <h2 className="text-5xl font-bold mb-4">
                {selectedSpace.title} - {selectedSpace.type}
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-4 relative h-40">
                <Image
                  src={selectedSpace.src}
                  alt={selectedSpace.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="overflow-y-auto max-h-80">
                <h2>Mô tả</h2>
                <div>
                  <p>Chi tiết</p>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <button
                  onClick={() => setSelectedSpace(null)}
                  className="mt-4 mr-4 btn "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-[2%]"></div>
      </div>
    </>
  );
};

export default Sample;
