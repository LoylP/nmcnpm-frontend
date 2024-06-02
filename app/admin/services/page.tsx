"use client";
import React, { useEffect, useState } from "react";
import { GET, POST, DELETE_Ser, PATCH } from "@/app/utils"
import Add from "@/components/Dashboard/add/add";
import { Button, Modal, message, Space } from 'antd';

interface Service {
    id: number;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

const Page = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [services, setService] = useState<Service[]>([]);

    const [selectedServices, setSelectedServices] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = (service: Service) => {
        setSelectedServices(service);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const body = {
                serviceId: selectedServices?.id,
                name: selectedServices?.name,
                //@ts-ignore
                price: parseInt(selectedServices?.price),
            }
            
            const res = await PATCH("v1/admin/service", body);
            const data = await res.json();
            messageApi.open({
                type: 'success',
                content: `Update Service with name=${body.name} success`,
            });
            setIsModalOpen(false);
            setTimeout(() => {
                location.reload()
              }, 1500);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: `Error: Price must be a number`,
              });
        }
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await GET("v1/services");
            // @ts-ignore
            console.log(res.data)
            setService(res.data);
            
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        };

        fetchData();
    }, []);
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const body = {
            name: name,
            price: parseInt(price),
          };
          const res = await POST({ body }, "v1/admin/service");
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
      
      const handleDelete = async (serviceId: number) => {
        try {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this service?"
          );
          if (!confirmDelete) return;
    
          const res = await DELETE_Ser(
            {serviceId},
            `v1/admin/service/`
          );
          if (res.ok) {
            setService(services.filter((service) => service.id !== serviceId));
          } else {
            console.error("Failed to delete service:", await res.json());
          }
        } catch (error) {   
          console.error("Error deleting service:", error);
        }
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedServices === null) return;

        const { name, value } = e.target;
        setSelectedServices((prevService) => prevService ? { ...prevService, [name]: value } : null);
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
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                placeholder="Service Name..." 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4 mx-auto">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-white"
                            >
                                Price
                            </label>
                            <input
                                type="text"
                                id="price"
                                className="mt-1 p-2 w-full border rounded-md bg-gray-300"
                                placeholder="Price..." 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        
                    </div>
                    <div className="w-full justify-center mb-4 p-4 mx-auto">
                        <button
                        type="submit"
                        className="w-full p-2 bg-sky-800 text-white rounded-md hover:bg-slate-700"
                        >
                        Add Service
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
            <th>NameService</th>
            <th>Price</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((ser, idx) => (
            <tr key={ser.id}>
                <td>
                    <Add content={idx}/>
                </td>
                <td>
                    <Add content={ser.name}/>
                </td>
                <td>
                    <Add content={ser.price}/>
                </td>
                <td>
                    <Add content={new Date(ser.createdAt).toLocaleDateString()}/>
                </td>
                <td>
                    <Add content={new Date(ser.updatedAt).toLocaleDateString()}/>
                </td>
                <td>
                    <div className="text-center mt-2">
                    {contextHolder}
                    <Button type="primary" onClick={() => showModal(ser)}>
                        Update
                    </Button>
                    <Modal className="text-center" title="Room Type Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        {selectedServices && (
                            <div className="my-2 text-left">                                               
                                <label className="text-2xl">Price</label>
                                <input
                                    className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
                                    type="number"
                                    name="price"
                                    value={selectedServices.price}
                                    onChange={handleChange}
                            />
                            </div>
                            
                        )}
                    </Modal>
                    <button
                      onClick={() => handleDelete(ser.id)}
                      className="mx-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                    </div>
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
