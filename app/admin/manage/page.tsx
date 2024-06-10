"use client";
import React, { useEffect, useState } from "react";
import { GET } from "@/app/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex bg-slate-800 mt-10 gap-1">
      <div className="flex flex-col gap-5">
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
    </div>
  );
};

export default Page;
