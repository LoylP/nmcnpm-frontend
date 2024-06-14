"use client";
import React, { useEffect, useState, Suspense } from "react";
import { GET, POST, DELETE, PATCH } from "@/app/utils";
import Add from "@/components/Dashboard/add/add";
import Search from "@/components/Dashboard/search/search";
import { useRouter } from "next/navigation";
import { message } from 'antd';

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
  roomType: roomType;
}

const Page = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");
  const [discount, setDiscount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomTypes, setRoomTypes] = useState<roomType[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>(""); // State for active filter
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  const error = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await GET("v1/room_type");
        if (res.statusCode === 401) {
          router.push("/login");
          return;
        }
        setRoomTypes(res.data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    const fetchRooms = async () => {
      try {
        const res = await GET("v1/room/get_room");
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRoomTypes();
    fetchRooms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newDiscount = parseFloat(discount);
      if (newDiscount < 0 || newDiscount > 1) {
        window.alert("Discount must be between 0 and 1");
        return;
      }
    } catch (error) {
      return;
    }

    try {
      const body = {
        roomNumber: parseInt(roomNumber),
        roomTypeId: parseInt(roomTypeId),
        discount: parseFloat(discount),
      };
      const res = await POST({ body }, "v1/admin/room");
      const data = await res.json();

      location.reload(); 

    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleDeactive = async (roomId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this room?"
      );
      if (!confirmDelete) return;

      const res = await PATCH(`v1/admin/room_deactive/${roomId}`, {});
      const data = await res.json()
      if (data.error == 0) {
        success("Deactive room successfully.");
        setTimeout(() => location.reload(), 500)
      } else {
        error(data.message)
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleActive = async (roomId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to active this room?"
      );
      if (!confirmDelete) return;

      const res = await PATCH(`v1/admin/room_active/${roomId}`, {});
      const data = await res.json()
      if (data.error == 0) {
        success("Active room successfully.");
        setTimeout(() => location.reload(), 500)
      } else {
        error(data.message)
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleDelete = async (roomId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this room?"
      );
      if (!confirmDelete) return;

      const res = await DELETE({},`v1/admin/room/${roomId}`);
      console.log(res)
      const data = await res.json()
      if (data.error == 0) {
        success("Delete room successfully.");
        setTimeout(() => location.reload(), 500)
      } else {
        error(data.message)
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  // Filtered rooms based on search query and active filter
  const filteredRooms = rooms.filter((room) =>
    (room.roomNumber.toString().includes(searchQuery) ||
      room.roomType.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeFilter === "" || (activeFilter === "Yes" && room.active) || (activeFilter === "No" && !room.active))
  );

  return (
    <>
      {contextHolder}
      <div className="flex mt-auto">
        <div className="w-1/3 mt-5">
          <div className="p-4 justify-items-center">
            <div className="justify-items-center bg-slate-500 px-3 py-3 rounded-lg shadow-lg mb-0 mx-auto text-black">
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
        <div className="w-2/3">
          <div className="bg-slate-800 p-5 rounded-lg mt-10">
            <div className="flex items-center justify-between">
              <Suspense>
                <Search placeholder="Search for a room..." onSearch={setSearchQuery} />
              </Suspense>
              <select
                className="p-2 bg-slate-600 border rounded-md"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="">All Active</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <table className="w-full mt-3 divide-y">
              <thead>
                <tr className="text-green-400">
                  <th>Index</th>
                  <th>RoomNumber</th>
                  <th>Active</th>
                  <th>RoomTypeName</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room, idx) => (
                  <tr key={room.id}>
                    <td>
                      <Add content={idx} />
                    </td>
                    <td>
                      <Add content={room.roomNumber} />
                    </td>
                    <td>
                      <Add content={room.active ? "Yes" : "No"} />
                    </td>
                    <td>
                      <Add content={room.roomType.name} />
                    </td>
                    <td>
                      <Add content={new Date(room.createdAt).toLocaleDateString()} />
                    </td>
                    <td>
                      <Add content={new Date(room.updatedAt).toLocaleDateString()} />
                    </td>
                    <td >
                      <button
                        onClick={() => {
                          if (room.active) {
                            handleDeactive(room.id)
                          } else {
                            handleActive(room.id)
                          }
                        }}
                        className={`${!room.active ? "text-green-500 hover:text-green-700" : "text-yellow-500 hover:text-yellow-700"}`}
                      >
                        {room.active ? "Deactive" : "Active"}
                      </button>
                      <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => handleDelete(room.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
