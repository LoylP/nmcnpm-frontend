"use client";
import RoomCard from "./RoomCard";
import { RoomData } from "./RoomData";

const Index = () => {
  return (
    <>
      <h3 className="border-b border-primary mt-12 mb-6 pb-4">
        Các mẫu phòng trong HNP hotel
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {RoomData.map((room, index) => (
          <RoomCard key={index} room={room} />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="btn hover:scale-125 transition ease-out duration-500">
          Load more
        </button>
      </div>
    </>
  );
};

export default Index;
