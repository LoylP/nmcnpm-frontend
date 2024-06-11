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
    <div className="flex flex-col bg-gray-200 mt-10 gap-1 rounded-xl">
      <div className="flex mx-auto my-2">
        <h1 className="text-3xl font-bold text-red-400">Management</h1>
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
