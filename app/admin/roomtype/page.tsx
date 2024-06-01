"use client";
import React, { useEffect, useState } from "react";
import { GET, POST, DELETE } from "@/app/utils";
import { Button, Modal, message, Space } from 'antd';

interface Service {
    id: number;
    name: string;
    quantity: number;
}

interface RoomService {
    id: number;
    service: Service;
    quantity: number;
}

interface RoomType {
    id: number;
    name: string;
    capacity: number;
    desc: string;
    priceBase: number;
    roomImage: string;
    createdAt: Date;
    updatedAt: Date;
    roomService: RoomService[];
}

const Page = () => {
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [desc, setDesc] = useState("");
    const [priceBase, setPriceBase] = useState("");
    const [selectedServices, setSelectedServices] = useState<{ id: number; name: string; quantity: number; }[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const res = await GET("v1/room_type");
                console.log(res.data)
                setRoomTypes(res.data);
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };

        const fetchServices = async () => {
            try {
                const res = await GET("v1/services");
                setServices(res.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchRoomTypes();
        fetchServices();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedServices.length === 0) {
            setErrorMessage("Please select at least one service.");
            return;
        }

        try {
            const body = {
                name: name,
                capacity: parseInt(capacity),
                desc: desc,
                priceBase: parseInt(priceBase),
                services: selectedServices.map(service => ({
                    name: service.name,
                    quantity: service.quantity,
                })),
            };
            const res = await POST({ body }, "v1/admin/room_type");
            const data = await res.json();

            console.log(data); // Ensure console.log works
            location.reload()

            // Redirect or navigate user to another page
            // For example: router.push("/dashboard");
        } catch (error) {
            console.error("Error registering:", error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    const handleServiceChange = (serviceId: number, name: string) => {
        const updatedServices = selectedServices.some(service => service.id === serviceId)
            ? selectedServices.filter(service => service.id !== serviceId)
            : [...selectedServices, { id: serviceId, name, quantity: 1 }];

        setSelectedServices(updatedServices);
    };

    const handleQuantityChange = (serviceId: number, quantity: number) => {
        const updatedServices = selectedServices.map(service =>
            service.id === serviceId ? { ...service, quantity } : service
        );
        setSelectedServices(updatedServices);
    };

    const handleDelete = async (roomtypeId: number) => {
        try {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this roomtype?"
          );
          if (!confirmDelete) return;
    
          const res = await DELETE(
            {},
            `v1/admin/room_type/${roomtypeId}`
          );
          if (res.ok) {
            setRoomTypes(roomTypes.filter((room_type) => room_type.id !== roomtypeId));
          } else {
            console.error("Failed to delete roomtype:", await res.json());
          }
        } catch (error) {   
          console.error("Error deleting roomtype:", error);
        }
      };

    return (
        <div className="flex flex-col items-center mt-5">
            <div className="w-full max-w-4xl">
                <div className="p-4 bg-slate-700 rounded-lg shadow-lg text-black">
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-x-4">
                            <div className="w-1/3">
                                <label htmlFor="name" className="block text-sm font-medium text-green-400">RoomType Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 p-2 w-full border rounded-md bg-slate-200"
                                    placeholder="Name RoomType..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="capacity" className="block text-sm font-medium text-green-400">Capacity</label>
                                <input
                                    type="text"
                                    id="capacity"
                                    className="mt-1 p-2 w-full border rounded-md bg-slate-200"
                                    placeholder="Capacity..."
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                />
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="priceBase" className="block text-sm font-medium text-green-400">Price Base</label>
                                <input
                                    type="text"
                                    id="priceBase"
                                    className="mt-1 p-2 w-full border rounded-md bg-slate-200"
                                    placeholder="Price..."
                                    value={priceBase}
                                    onChange={(e) => setPriceBase(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex my-4 space-x-5">
                            <div className="w-2/5">
                                <label htmlFor="desc" className="block text-sm font-medium text-green-400">Description</label>
                                <textarea
                                    id="desc"
                                    className="mt-1 p-2 w-full h-5/6 border rounded-md bg-gray-200"
                                    placeholder="Description..."
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>
                            <div className="w-3/5">
                                <label htmlFor="services" className="block text-sm font-medium text-green-400">Services</label>
                                <div className="h-3/5 overflow-y-auto mt-1 p-2 w-full border rounded-md bg-gray-500 grid grid-cols-2 gap-4">
                                    {services.map(service => (
                                        <div key={service.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`service-${service.id}`}
                                                value={service.id}
                                                checked={selectedServices.some(s => s.id === service.id)}
                                                onChange={() => handleServiceChange(service.id, service.name)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`service-${service.id}`} className="text-white">{service.name}</label>
                                            {selectedServices.some(s => s.id === service.id) && (
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={selectedServices.find(s => s.id === service.id)?.quantity || 1}
                                                    onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value))}
                                                    className="ml-2 p-1 w-16 border rounded-md bg-gray-300"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <label htmlFor="services" className="mt-2 mb-1 block text-sm font-medium text-green-400">Selected Services</label>
                                <div className="p-2 w-full border rounded-md bg-gray-500 grid grid-cols-3">
                                    {selectedServices.length > 0 ? (
                                        selectedServices.map(service => (
                                            <div key={service.id} className="flex items-center">
                                                <span className="text-white">{service.name}:</span>
                                                <span className="ml-2 text-white"> {service.quantity}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white">No services selected.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full p-2 bg-sky-800 text-white rounded-md hover:bg-slate-700"
                            >
                                Add RoomType
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full max-w-6xl mt-10">
                <div className="bg-slate-800 p-5 rounded-lg">
                    <table className="w-full divide-y divide-gray-700">
                        <thead>
                            <tr className="text-green-400">
                                <th className="py-2">Index</th>
                                <th className="py-2">Name_RoomType</th>
                                <th className="py-2">Capacity</th>
                                <th className="py-2">CreatedAt</th>
                                <th className="py-2">UpdatedAt</th>
                                <th className="py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomTypes.map((roomType, idx) => (
                                <tr key={roomType.id}>
                                    <td className="py-2 text-center">{idx + 1}</td>
                                    <td className="py-2 text-center">{roomType.name}</td>
                                    <td className="py-2 text-center">{roomType.capacity}</td>
                                    <td className="py-2 text-center">{new Date(roomType.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 text-center">{new Date(roomType.updatedAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="flex mt-2 justify-center item-center gap-5">
                                            <button
                                                onClick={() => handleDelete(roomType.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                            <Button type="primary" onClick={() => showModal(roomType)}>
                                                Update
                                            </Button>
                                            <Modal className="text-center" title="Room Type Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                {selectedRoomType && (
                                                    <div className="my-2 text-left">                                               
                                                        <p><b className="text-sky-700">Name:</b> {selectedRoomType.name}</p>
                                                        <p><b className="text-sky-700">Capacity:</b> {selectedRoomType.capacity}</p>
                                                        <p><b className="text-sky-700">Description:</b> {selectedRoomType.desc}</p>
                                                        <p><b className="text-sky-700">Price Base:</b> {selectedRoomType.priceBase}</p>
                                                        <p><b className="text-sky-700">Created At:</b> {new Date(selectedRoomType.createdAt).toLocaleDateString()}</p>
                                                        <p><b className="text-sky-700">Updated At:</b> {new Date(selectedRoomType.updatedAt).toLocaleDateString()}</p>
                                                        <p><b className="text-sky-700">Services:</b></p>
                                                        <ul>
                                                            {selectedRoomType.roomService.map((rs) => (
                                                                
                                                                <li key={rs.id}>
                                                     
                                                                    <p className="mx-4" key={rs.service.id}>{rs.service.name} - {rs.quantity}</p>
                                                                    {/* {rs.service.map((ser) => (
                                                                        <p key={ser.id}>{ser.name} (Quantity: {ser.quantity})</p>
                                                                    ))} */}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </Modal>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Page;