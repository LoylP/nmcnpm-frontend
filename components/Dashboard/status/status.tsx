"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GET } from "@/app/utils";

// Define the User type
interface Role {
  id: number;
  name: string;
  createdAt: Date;
  updateAt: Date;
}

interface User {
  id: number;
  userName: string;
  phone: string;
  email: string;
  fullName: string;
  role: Role;
  avatar?: string;
}

const Status: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GET("v1/admin/user");
        // @ts-ignore
        const data = await res.json();
        const adminUsersData = data.data.filter(
          (user: User) => user.role.name === "admin"
        );
        setAdminUsers(adminUsersData);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-5 text-gray-700">Admin Status</h2>
      <table className="w-full">
        <thead className="border-b border-gray-300">
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-300">
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/avatar_admin.jpg"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{user.userName}</span>
                </div>
              </td>
              <td className="py-3">
                <span className="px-2 py-1 bg-green-400 rounded text-sm">
                  Online
                </span>
              </td>
              <td className="py-3">{user.email}</td>
              <td className="py-3">{user.phone}</td>
              <td className="py-3">{user.role.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Status;
