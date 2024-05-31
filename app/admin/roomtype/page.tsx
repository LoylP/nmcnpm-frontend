"use client";
import React, { useEffect, useState } from "react";
import { GET, POST } from "@/app/utils"

interface Service {
    id: number;
    name: string;
    price: number;
}

interface RoomService {
    id: number;
    service: Service;
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

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const res = await GET("v1/room_type");
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

    return (
        <div className="flex">
            <div className="w-1/3">
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
                                            RoomType
                                        </label>
                                        <select
                                            className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                            <option value="...">...</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Superior">Superior</option>
                                            <option value="Luxury">Luxury</option>
                                        </select>
                                    </div>
                                    <div className="mb-4 mx-auto">
                                        <label
                                            htmlFor="capacity"
                                            className="block text-sm font-medium text-white"
                                        >
                                            Capacity
                                        </label>
                                        <input
                                            type="text"
                                            id="capacity"
                                            className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                            placeholder="Capacity..."
                                            value={capacity}
                                            onChange={(e) => setCapacity(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 mx-auto">
                                        <label
                                            htmlFor="desc"
                                            className="block text-sm font-medium text-white"
                                        >
                                            Desc
                                        </label>
                                        <input
                                            type="text"
                                            id="desc"
                                            className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                            placeholder="Desc..."
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 mx-auto">
                                        <label
                                            htmlFor="priceBase"
                                            className="block text-sm font-medium text-white"
                                        >
                                            PriceBase
                                        </label>
                                        <input
                                            type="text"
                                            id="priceBase"
                                            className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                            placeholder="Price..."
                                            value={priceBase}
                                            onChange={(e) => setPriceBase(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 mx-auto">
                                        <label
                                            htmlFor="services"
                                            className="block text-sm font-medium text-white"
                                        >
                                            Services
                                        </label>
                                        {services.map(service => (
                                            <div key={service.id} className="flex items-center mt-2">
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
                                </div>
                                <div className="w-full justify-center mb-4 p-4 mx-auto">
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
                </div>
            </div>
            <div className="w-2/3">
                <div className="bg-slate-800 p-5 rounded-lg mt-10">
                    <div className="flex items-center justify-between"></div>
                    <table className="w-full mt-5 divide-y">
                        <thead>
                            <tr className="text-green-400">
                                <th>Index</th>
                                <th>Name_RoomType</th>
                                <th>Capacity</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomTypes.map((roomType, idx) => (
                                <tr key={roomType.id}>
                                    <td>
                                        <div className="flex mt-2 justify-center item-center gap-5">
                                            {idx}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex mt-2 justify-center item-center gap-5">
                                            {roomType.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex mt-2 justify-center item-center gap-5">
                                            {roomType.capacity}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex mt-2 justify-center item-center gap-5">
                                            {new Date(roomType.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex mt-2 justify-center item-center gap-5">
                                            {new Date(roomType.updatedAt).toLocaleDateString()}
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
