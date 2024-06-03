"use client";
import React, { useEffect, useState } from "react";
import { GET, POST } from "@/app/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RoomService {
  id: number;
  quantity: number;
}

interface RoomType {
  id: number;
  name: string;
  capacity: number;
  desc: string;
  priceBase: number;
  roomImage: string;
  roomService: RoomService[];
}


const Booking = () => {
  const [roomType, setRoomType] = useState<RoomType[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();

  const fetchRoomTypeImage = async (roomTypeId: number) => {
    try {
      const res = await POST({}, `v1/room_type/room_type_image/${roomTypeId}`);
      console.log("res: ", res)
      const imagePath = await res.json();
      
      if (imagePath) {
        const splitStr = imagePath.result.split("/");
        if (splitStr[0] === "images") {
          imagePath.result = imagePath.result.replace("images", "static");
        }
        setImage(`${process.env.NEXT_PUBLIC_IMAGES_FOLDER}${imagePath.result}`);
      } else {
        setError("Failed to set image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setError("Failed to fetch image");
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GET("v1/room_type");
        console.log("res: ", res)
        const data = await res.data;
        setRoomType(data);

        if (data.length > 0) {
          const initialRoomTypeId = data[0].roomType.id;
          fetchRoomTypeImage(initialRoomTypeId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleRoomTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomTypeId = parseInt(e.target.value);
    console.log(roomTypeId)
    const selectedRoomType = roomType.find(roomType => roomType.id === roomTypeId) || null;
    setSelectedRoomType(selectedRoomType);

    if (selectedRoomType) {
        fetchRoomTypeImage(roomTypeId);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoomType) {
      try {
        const res = await POST("v1/room_detail/create", { roomTypeId: selectedRoomType.id });
        const data = await res.json();
        if (data.status === 200) {
          setError(null);
          alert("Booking successful");
          router.push("/booking"); // Redirect to a success page or any other page
        } else {
          setError(data.message || "Failed to book room");
        }
      } catch (error) {
        console.error("Error booking room:", error);
        setError("Failed to book room");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-4 gap-4 p-2 bg-slate-700">
      <div className="p-4 rounded-xl font-bold h-1/2 bg-slate-500 text-white">
        <div className="w-72 h-72 relative rounded-md overflow-hidden mb-4">
          {image ? (
            <Image loader={() => image} alt="Room Type Image" className="rounded-md" src={image} width={280} height={340} />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
      
      <div className="flex-auto bg-slate-500 p-4 rounded-xl text-slate-950">
        <div className="flex gap-10 mb-10">
          <label className="text-2xl">Type</label>
          <select
            className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
            name="roomType"
            onChange={handleRoomTypeChange}
          >
            <option value="">Select a room type</option>
            {roomType.map(roomtype => (
              <option key={roomtype.id} value={roomtype.id}>
                {roomtype.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col mb-4">
          <button
            type="submit"
            className="px-40 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-500"
          >
            Book Room
          </button>
        </div>
      </div>
    </form>
  );
};

export default Booking;
