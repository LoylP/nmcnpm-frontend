"use client";
import React, { useEffect, useState } from "react";
import { GET, POST, DELETE } from "@/app/utils"
import Add from "@/components/Dashboard/add/add";

interface roomType {
    id: number;
    name: string;
    capacity: number;
    desc: string;
    priceBase: number;
}

interface Room {
    id: number;
    roomNumber: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    roomType: roomType
}

const Page = () => {
    const [roomNumber, setRoomNumber] = useState("");
    const [roomTypeId, setRoomTypeId] = useState("");
    const [discount, setDiscount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [roomTypes, setRoomTypes] = useState<roomType[]>([]);
    const [rooms, setRoom] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const res = await GET("v1/room_type");
                setRoomTypes(res.data);
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };

        const fetchRoom = async () => {
            try {
                const res = await GET("v1/room/get_room");
                setRoom(res.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchRoomTypes();
        fetchRoom();
    }, []);
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
          const newDiscount = parseFloat(discount);
          if (newDiscount < 0 && newDiscount > 1){
            window.alert("discount must be between 0 and 1")
            return
          }
        } catch(error){
          return
        }
        try {
          const body = {
            roomNumber: parseInt(roomNumber),
            roomTypeId: parseInt(roomTypeId),
            discount: parseFloat(discount)
          };
          console.log("room body: ", body)
          const res = await POST({ body }, "v1/admin/room");
          const data = await res.json();
    
          console.log(data); // Đảm bảo console.log hoạt động
          location.reload()
    
          // Redirect hoặc điều hướng người dùng đến trang khác
          // Ví dụ: router.push("/dashboard");
        } catch (error) {
          console.error("Error registering:", error);
          setErrorMessage("Something went wrong. Please try again.");
        }
      };
      
      const handleDelete = async (roomId: number) => {
        try {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this room?"
          );
          if (!confirmDelete) return;
    
          const res = await DELETE(
            {},
            `v1/admin/room/${roomId}`
          );
          if (res.ok) {
            setRoom(rooms.filter((room) => room.id !== roomId));
          } else {
            console.error("Failed to delete service:", await res.json());
          }
        } catch (error) {   
          console.error("Error deleting service:", error);
        }
      };

     

    return (
        <div className="flex mt-auto">
            <div className="w-1/3 mt-5">
            <div className="p-4 justify-items-center">
            <div className=" justify-items-center bg-slate-500 px-3 py-3 rounded-lg shadow-lg mb-0 mx-auto text-black">
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <div>
                    <form onSubmit={handleSubmit}>
                    <div className="flex-col w-full justify-center">
                        <div className="mb-4 mx-auto">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-white"
                            >
                                RoomNumber
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                placeholder="RoomNumber..." 
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                            />
                        </div>

                        <div className="mb-4 mx-auto">
                            <label
                                htmlFor="discount"
                                className="block text-sm font-medium text-white"
                            >
                                Discount
                            </label>
                            <input
                                type="text"
                                id="discount"
                                className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                placeholder="Discount..." 
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        <div className="mb-4 mx-auto">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-white"
                            >
                                RoomTypeId
                            </label>
                            <select
                                id="roomTypeId"
                                className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                value={roomTypeId}
                                onChange={(e) => setRoomTypeId(e.target.value)}
                                >
                                <option value="">Select Room Type</option>
                                {roomTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        
                        
                    </div>
                    <div className="w-full justify-center mb-4 p-4 mx-auto">
                        <button
                        type="submit"
                        className="w-full p-2 bg-sky-800 text-white rounded-md hover:bg-slate-700"
                        >
                        Add Room
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
            <div className="w-2/3"><div className="bg-slate-800 p-5 rounded-lg mt-10">
      <div className="flex items-center justify-between">
      </div>
      <table className="w-full mt-3 divide-y">
        <thead>
          <tr className="text-green-400">
            <th>Index</th>
            <th>RoomNumber</th>
            <th>RoomTypeId</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, idx) => (
            
            <tr key={room.id}>
                <td>
                    <Add content={idx}/>
                </td>
                <td>
                    <Add content={room.roomNumber}/>
                </td>
                <td>
                    <Add content={room.roomType.id}/>
                </td>
                <td>
                    <Add content={new Date(room.createdAt).toLocaleDateString()}/>
                </td>
                <td>
                    <Add content={new Date(room.updatedAt).toLocaleDateString()}/>
                </td>
                <td>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></div>
        </div>
        
  );
};



export default Page;
