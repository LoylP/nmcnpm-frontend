"use client";
import React, { useEffect, useState } from "react";
import { GET } from "@/app/utils";

const Page = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarPath = await GET("v1/user/user_avatar");
        console.log(avatarPath.result)
        if (avatarPath) {
          const split_str = avatarPath.result.split("/")
          if (split_str[0] === "images"){
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
          <h1>Hello</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {avatar ? (
          <img src={avatar} alt="User Avatar" className="rounded-full" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
