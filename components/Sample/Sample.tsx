"use client";
import Image from "next/image";
import RoomCard from "./RoomCard";
import { RoomData, Room } from "./RoomData";
import { useState } from "react";

const ITEMS_PER_PAGE = 1;

const Sample = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  // Pagination states for room images
  const [roomIndex, setRoomIndex] = useState(0);
  const roomStartIndex = roomIndex;
  const roomEndIndex = roomStartIndex + ITEMS_PER_PAGE;
  const displayedRoomImages = RoomData.slice(roomStartIndex, roomEndIndex);

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
      <div className="flex mx-auto my-10 bg-slate-900">
        <div className="mx-auto relative overflow-hidden w-[80%]">
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
      </div>
      <div className="flex justify-center gap-4 mt-6">
        {RoomData.map((room, index) => (
          <div key={index} className="cursor-pointer" onClick={() => setRoomIndex(index)}>
            <Image src={room.src} alt={room.title} width={100} height={100} className="rounded-md" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Sample;
