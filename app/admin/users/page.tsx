"use client";
import Search from "@/components/Dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { GET, DELETE } from "@/app/utils";

// Define the User type
interface role {
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
  city: string;
  country: string;
  createdAt: Date;
  updateAt: Date;
  role: role;
  avatar?: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GET("v1/admin/user");
        // @ts-ignore
        const data = await res.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmDelete) return;

      const res = await DELETE(
        {},
        `v1/admin/user/delete_user_by_condition?condition=id&value=${userId}`
      );
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to delete user:", await res.json());
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-slate-800 p-5 rounded-lg mt-10">
      <div className="flex items-center justify-between">
        <Suspense>
          <Search placeholder="Search for a user..." />
        </Suspense>
        <Link href="/admin/users/add">
          <button className="p-1 bg-green-500 text-white border rounded-md cursor-pointer hover:bg-yellow-500">
            + Add New
          </button>
        </Link>
      </div>
      <table className="w-full mt-5">
        <thead>
          <tr>
            <th>UserName</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CreatedAt</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="flex mt-2 item-center gap-5">
                  <Image
                    src="/avt_admin.webp"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  {user.userName}
                </div>
              </td>
              <td>{user.fullName}</td>
              <td>{user.email || "N/A"}</td>
              <td>{user.phone}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{user.role.name}</td>
              <td>
                {user.role.name !== "admin" && (
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
                <Link href={`/admin/users/edit/${user.id}`}>
                  <button className="text-blue-500 hover:text-blue-700 ml-3">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
