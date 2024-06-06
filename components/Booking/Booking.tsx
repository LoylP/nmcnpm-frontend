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

  const showModal = (roomType: RoomType) => {
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
    <div className="gap-4 p-2 bg-slate-700">
      <div className="grid grid-cols-4 gap-8">
      {roomType.map((roomtype, index) => (
        <div onClick={() => router.push(`/roomtype/${roomtype.id}`)} key={roomtype.id} className="p-4 rounded-xl font-bold h-full bg-slate-500 text-white hover:cursor-pointer transition-colors duration-200 hover:bg-cyan-800 ">
          <div className="w-[90%] h-[90%] rounded-md overflow-hidden mb-4">
            {roomtype.name}
            <div className="relative h-48 mt-4">
              <Image
                src={convertImagePath(roomtype.roomImage)}
                alt={roomtype.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
              <Button className="bg-slate-700" type="primary" onClick={() => showModal(roomtype)}>
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
