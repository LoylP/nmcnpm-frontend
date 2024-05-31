"use client";
import React, { useEffect, useState } from "react";
import { GET, POST } from "@/app/utils"

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
    const [service, setService] = useState<Service[]>([]);

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
    
          // Redirect hoặc điều hướng người dùng đến trang khác
          // Ví dụ: router.push("/dashboard");
        } catch (error) {
          console.error("Error registering:", error);
          setErrorMessage("Something went wrong. Please try again.");
        }
      };

    return (
        <div className="flex">
            <div className="w-1/3">
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
      <table className="w-full mt-5 divide-y">
        <thead>
          <tr className="text-green-400">
            <th>Index</th>
            <th>NameService</th>
            <th>Price</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
          </tr>
        </thead>
        <tbody>
          {service.map((ser, idx) => (
            
            <tr key={ser.id}>
                <td>
                    <div className="flex mt-2 justify-center  item-center gap-5">
                    {idx}
                    </div>
                </td>
                <td>
                    <div className="flex mt-2 justify-center  item-center gap-5">
                      {ser.name}
                    </div>
                </td>
                <td>
                    <div className="flex mt-2 justify-center  item-center gap-5">
                        {ser.price}
                    </div></td>
                <td>
                    <div className="flex mt-2 justify-center  item-center gap-5">
                        {new Date(ser.createdAt).toLocaleDateString()}
                    </div>
                </td>
                <td>
                    <div className="flex mt-2 justify-center  item-center gap-5">
                        {new Date(ser.updatedAt).toLocaleDateString()}
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
