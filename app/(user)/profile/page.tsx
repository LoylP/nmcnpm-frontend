"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GET } from "@/app/utils";

interface User {
  id: number;
  userName: string;
  phone: string;
  email: string;
  fullName: string;
  city: string;
  country: string;
  createdAt: Date;
}

const Page = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GET("v1/user");
        // @ts-ignore
        const data = await res.json();
        if (data && data.data && data.data.length > 0) {
          setUser(data.data[0]); // Set the first user from the response
        }
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mt-4 gap-4 p-2 bg-slate-300">
      <div className="p-4 rounded-xl font-bold h-1/2 bg-slate-500">
        <div className="w-60 h-60 relative rounded-md overflow-hidden mb-4">
          <Image src="/avt_admin.webp" alt="User Avatar" fill />
        </div>
        {user.userName}
      </div>
      <div className="flex-auto bg-slate-500 p-4 rounded-xl">
        <div className="text-2xl">Username</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="username"
          placeholder={user.userName}
        />
        <div className="text-2xl mt-2">FullName</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="fullname"
          placeholder={user.fullName}
        />
        <div className="text-2xl mt-2">Email</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="email"
          placeholder={user.email}
        />
        <div className="text-2xl mt-2">Phone</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="phone"
          placeholder={user.phone}
        />
        <div className="text-2xl mt-2">Gender</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="gender"
          placeholder="gender"
        />
        <div className="text-2xl mt-2">City</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="city"
          placeholder={user.city}
        />
        <div className="text-2xl mt-2">Country</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="country"
          placeholder={user.country}
        />
      </div>
    </div>
  );
};

export default Page;
