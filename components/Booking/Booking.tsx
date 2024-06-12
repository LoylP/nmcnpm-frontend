import React, { useEffect, useState } from "react";
import { GET, POST, convertImagePath } from "@/app/utils";
import { useRouter } from "next/navigation";
import { Button, Modal } from 'antd';
import Image from "next/image";

interface Service {
  id: number;
  name: string;
}

interface RoomService {
  id: number;
  quantity: number;
  service: Service;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();

  const showModal = (roomType: RoomType, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the click event from bubbling up to the parent
    setSelectedRoomType(roomType);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchRoomTypeImage = async (roomTypeId: number) => {
    try {
      const res = await POST({}, `v1/room_type/room_type_image/${roomTypeId}`);
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
        if (res.statusCode == 401) {
          router.push('/login');
          return;
        }
        const data = await res.data;
        setRoomType(data);

        if (data.length > 0) {
          const initialRoomTypeId = data[0].id; // Changed roomType.id to id
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
    const selectedRoomType = roomType.find(roomType => roomType.id === roomTypeId) || null;
    setSelectedRoomType(selectedRoomType);

    if (selectedRoomType) {
      fetchRoomTypeImage(roomTypeId);
    }
  };

  return (
    <div className="gap-4 p-2 bg-slate-500">
      <div className="grid grid-cols-2 gap-8">
        {roomType.map((roomtype, index) => (
          <div
            onClick={() => router.push(`/roomtype/${roomtype.id}`)}
            key={roomtype.id}
            className="flex flex-row p-4 rounded-xl font-bold bg-slate-300 text-black hover:cursor-pointer transition-colors duration-200 hover:bg-white"
          >
            <div className="relative w-[45%] h-72 overflow-hidden mb-4">
              <Image
                // @ts-ignore
                src={convertImagePath(roomtype.roomImage)}
                alt={roomtype.name}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
            <div className="relative w-full lg:w-[55%] p-4 flex flex-col justify-between">
              <div>
                <b className="text-xl text-amber-700">{roomtype.name}</b>
                <div className="flex text-gray-700 mt-2">
                  <b className="mr-2 text-blue-800">Capacity:</b>{roomtype.capacity}
                </div>
                <div className="mt-2 text-gray-600 overflow-hidden text-ellipsis break-words"><b className="text-blue-800">Description:</b> {roomtype.desc}</div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="bg-yellow-500 text-gray-600 px-2 rounded-2xl">
                  Price: {roomtype.priceBase}
                </button>
                <Button
                  className="bg-green-600"
                  type="primary"
                  onClick={(e) => showModal(roomtype, e)}
                >
                  View Detail
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        className="text-center"
        title="Room Type Details"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedRoomType && (
          <div className="my-2 text-left">
            <p><b className="text-sky-700">Name:</b> {selectedRoomType.name}</p>
            <p><b className="text-sky-700">Capacity:</b> {selectedRoomType.capacity}</p>
            <p><b className="text-sky-700">Description:</b> {selectedRoomType.desc}</p>
            <p><b className="text-sky-700">Price Base:</b> {selectedRoomType.priceBase}</p>
            <p><b className="text-sky-700">Services:</b></p>
            <ul>
              {selectedRoomType.roomService.map((rs) => (
                <li key={rs.id}>
                  <p className="mx-4" key={rs.service.id}>{rs.service.name} - {rs.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Booking;
