"use client";
import Image from "next/image";
import RoomCard from "./RoomCard";
import SpaceCard from "./SpaceCard";
import { RoomData, Room } from "./RoomData";
import { SpaceData, Space } from "./RoomData";
import { useState } from "react";

const Sample = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space);
  };
  return (
    <>
      <div className="">
        <h1 className=" text-cyan-900">Explore the spaces here</h1>
      </div>
      <h3 className="border-b border-primary mt-6 mb-6 pb-4">
        Room Models in HNP
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {RoomData.map((room, index) => (
          <RoomCard key={index} room={room} onRoomClick={handleRoomClick} />
        ))}
      </div>
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg  ">
            <h2 className="text-5xl font-bold mb-4">
              {selectedRoom.title} - {selectedRoom.type}
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="relative h-40">
                  <Image
                    src={selectedRoom.src}
                    alt={selectedRoom.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="overflow-y-auto max-h-80">
              <h2>Thông tin</h2>
              <div>
                <div>Diện tích: ???</div>
                <div>Điều hòa không khí: </div>
                <div>Phòng tắm riêng: </div>
                <div>Tivi màn hình phẳng: </div>
                <div>Hệ thống cách âm: </div>
                <div>Minibar: </div>
                <div>Wifi miễn phí: </div>
              </div>
              <h2>Mô tả</h2>
              <div>
                <p>Phòng được vệ sinh sạch sẽ trước khi khách vào nhận phòng</p>
                <p>
                  Đầy đủ tiện nghi và hệ thống cách âm giúp khách thoải mái tự
                  do không bị làm phiền
                </p>
                <p>Căn này bố trí 1 giường.</p>
              </div>
              <h2>Một số tiện nghi phòng (khác)</h2>
              <div>
                <div>Đồ vệ sinh cá nhân miễn phí</div>
                <div>Áo choàng tắm </div>
                <div>Chậu rửa vệ sinh (bidet) </div>
                <div>Có Bồn tắm và Vòi sen </div>
                <div>Dép </div>
                <div>Máy sấy tóc </div>
                <div>Giấy vệ sinh </div>
                <div>Bàn làm việc</div>
                <div>Bàn ủi li quần </div>
                <div>Chậu rửa vệ sinh (bidet) </div>
                <div>Có Bồn tắm và Vòi sen </div>
                <div>Nước rửa tay </div>
                <div>Truyền hình vệ tinh </div>
                <div>Máy lọc không khí </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <button
                onClick={() => setSelectedRoom(null)}
                className="mt-4 mr-4 btn "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <h3 className="border-b border-primary mt-12 mb-6 pb-4">Other Spaces</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {SpaceData.map((space, index) => (
          <SpaceCard
            key={index}
            space={space}
            onSpaceClick={handleSpaceClick}
          />
        ))}
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
      <div className="flex justify-center">
        <button className="btn hover:scale-125 transition ease-out duration-500  ">
          Load more
        </button>
      </div>
    </>
  );
};

export default Sample;
