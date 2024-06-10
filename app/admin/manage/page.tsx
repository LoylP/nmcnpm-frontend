"use client";
import React, { useEffect, useState } from "react";
import { GET } from "@/app/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Col, Table } from 'antd';

const { Column } = Table;
interface DataType {
  key: React.Key;
  desc: string,
  name: string,
  url: string
}

const Page = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarPath = await GET("v1/user/user_avatar");
        if (avatarPath.statusCode == 401) {
          router.push("/login");
          return;
        }
        if (avatarPath) {
          const split_str = avatarPath.result.split("/")
          if (split_str[0] === "images") {
            avatarPath.result = avatarPath.result.replace("images", "static")
          }
          setAvatar(`${process.env.NEXT_PUBLIC_IMAGES_FOLDER}${avatarPath.result}`);
        } else {
          setError("Failed to set avatar");
        }
      } catch (err) {
        setError("Failed to fetch avatar");
        console.error(err);
      }
    };

    fetchAvatar();
    console.log(avatar)
  }, []);



  const dataSource: DataType[] = [
    {
      key: "1",
      desc: "Service Management",
      name: "Service",
      url: "/admin/services"
    },
    {
      key: "2",
      desc: "RoomType Management",
      name: "RoomType",
      url: "/admin/roomtype"
    },
    {
      key: "3",
      desc: "Room Management",
      name: "Room",
      url: "/admin/room"
    },
    {
      key: "4",
      desc: "Bill Management",
      name: "Bill",
      url: "/admin/bill"
    }
  ]

  return (
    <div className="flex flex-col bg-slate-800 mt-10 gap-1">
      {/* <div className="flex flex-col gap-5">
        <div className="flex-col">
          <strong className="block my-4 text-red-400">1. Service, RoomType, Room Management</strong>
          <div className="flex gap-5 justify-between">
            <Link href={"/admin/services"}>
              <button className="bg-slate-400 w-30 h-20 p-2 rounded-2xl hover:bg-green-400">Add Service</button>
            </Link>
            <Link href={"/admin/roomtype"}>
              <button className="bg-slate-400 w-30 h-20 p-2 rounded-2xl hover:bg-green-400">Add RoomType</button>
            </Link>
            <Link href={"/admin/room"}>
              <button className="bg-slate-400 w-30 h-20 p-2 rounded-2xl hover:bg-green-400">Add Room</button>
            </Link>
          </div>
        </div>
        <div className="">
          <strong className="block my-4 text-red-400">2. Bill Management</strong>
        </div>
      </div> */}
      <div className="flex mx-auto my-2">
        <p className="text-3xl font-bold text-red-400">Management</p>
      </div>
      <div>
        <Table dataSource={dataSource}>
          <Column title="Desc" dataIndex="desc" key="desc" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: DataType) => (
              <Link href={`${record.url}`}>
                <button className="bg-slate-400 w-30 h-20 p-2 min-w-[50%] rounded-2xl hover:bg-green-400">{record.name}</button>
              </Link>
            )}
          />`
        </Table>
      </div>
    </div>
  );
};

export default Page;
