"use client";
import { MdSupervisedUserCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { GET, POST } from "@/app/utils";
import UsersPage from "@/app/admin/users/page";

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

interface Room {
  id: number;
  roomNumber: number;
}

interface Bill {
  id: number;
  priceAll: number;
}

function convertToAbbreviation(num: number) {
  // Create a new Intl.NumberFormat object with options
  const formatter = new Intl.NumberFormat('en', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumSignificantDigits: 3
  });
  
  // Format the number and return the result
  return formatter.format(num);
}


const Card: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res_room = await GET("v1/room/get_room");
        setRooms(res_room.data);

        const res_bill = await GET("v1/admin/bills");
        console.log(res_bill)
        //@ts-ignore
        const totalRevenueValue = res_bill.data.reduce((total, bill) => total + parseFloat(bill.priceAll), 0);
        setTotalRevenue(totalRevenueValue);

        const res = await GET("v1/admin/user");
        // @ts-ignore
        const adminUsersData = res.data.filter(
          (user: User) => user.role.name === "admin"
        );
        setAdminUsers(adminUsersData);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-5 justify-between mx-10 my-7 gap-10">
      <div className="flex mx-10 bg-slate-900 p-5 rounded-xl cursor-pointer hover:bg-slate-700 w-[25%]">
        <MdSupervisedUserCircle className="text-3xl" />
        <div className="flex flex-col gap-5">
          <span className="text-xl ">Total User</span>
          <span className="text-5xl font-medium">{users.length}</span>
          <span className="flex text-xl font-light">
            <span className="text-2xl text-green-400">{adminUsers.length}</span>: Admin</span>
          <span className="flex text-xl font-light">
            <span className="text-2xl text-green-400">{users.length - adminUsers.length}</span>: User</span>
        </div>
      </div>
      <div className="flex mx-10 bg-slate-900 p-5 rounded-xl cursor-pointer hover:bg-slate-700 w-[25%]">
        <MdSupervisedUserCircle className="text-3xl" />
        <div className="flex flex-col gap-5">
          <span className="text-xl ">Total Room</span>
          <span className="text-5xl font-medium text-green-400">{rooms.length}</span>
        </div>
      </div>
      <div className="flex  mx-10 bg-slate-900 p-5 rounded-xl cursor-pointer hover:bg-slate-700 w-[50%]">

        <MdSupervisedUserCircle className="text-3xl" />
        <div className="flex flex-col w-full">
          <div className="gap-5">
            <span className="text-xl">Total Revenue</span>
          </div>
            <div className="flex justify-center items-center my-4">
              <div><span className="text-5xl font-medium text-yellow-500">{convertToAbbreviation(totalRevenue)} $</span></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
