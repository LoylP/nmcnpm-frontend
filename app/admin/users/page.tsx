"use client";
import Search from "@/components/Dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GET } from "@/app/api/route";

const UsersPage = async () => {
  return (
    <div className="bg-slate-800 p-5 rounded-lg mt-10">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a user..." />
        <Link href="/admin/users/add">
          <button className="p-1 bg-green-500 text-white border rounded-md cursor-pointer hover:bg-yellow-500">
            + Add New
          </button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>SĐT</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <Image
                  src={"/assets/avt_admin.webp"}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-1/2 object-cover"
                />
                LoylP
              </div>
            </td>
            <td>aaaa@gmail.com</td>
            <td>09123456</td>
            <td>18.03.2024</td>
            <td>Client</td>
            <td>Not</td>
            <td>Not</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
