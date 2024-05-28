"use client";
import React, { useEffect, useState } from "react";
import { GET, PATCH, POST_UPLOAD } from "@/app/utils";

interface User {
  id: number;
  userName: string;
  phone: string;
  email: string;
  fullName: string;
  city: string;
  country: string;
  gender: number;
}

const Info = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avatarPath = await GET("v1/user/user_avatar");
        if (avatarPath) {
          const splitStr = avatarPath.result.split("/");
          if (splitStr[0] === "images") {
            avatarPath.result = avatarPath.result.replace("images", "static");
          }   
          setAvatar(`${process.env.NEXT_PUBLIC_IMAGES_FOLDER}${avatarPath.result}`);
        } else {
          setError("Failed to set avatar");
        }
        const res = await GET("v1/user");
        //@ts-ignore
        const data = res;
        if (data && data.data && data.data.length > 0) {
          setUser(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        if (typeof(user.gender) === "string") {
          user.gender = parseInt(user.gender);
        }
        const res = await PATCH("v1/user", user);
        const data = await res.json();
        console.log(user);
        console.log(data);
        if (data.status === 200) {
          setError(null);
        } else {
          setError(data.message || "Failed to update user");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setError("Failed to update user");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const res = await POST_UPLOAD("v1/user/user_avatar/upload", formData);
        const data = res;
        if (res.ok) {
          setAvatar(`${process.env.NEXT_PUBLIC_IMAGES_FOLDER}${data.result}`);
          setPreview(null);
          setSelectedFile(null);
      //     setTimeout(function(){// wait for 2.5 
      //       location.reload();
      //  }, 2500); 
        } else {
          setError(data.message || "Failed to upload avatar");
        }
      
      } catch (error) {
        console.error("Error uploading avatar:", error);
        setError("Failed to upload avatar");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex mt-4 gap-4 p-2 bg-slate-700">
      <div className="p-4 rounded-xl font-bold h-1/2 bg-slate-500 text-white">
        <div className="w-60 h-60 relative rounded-md overflow-hidden mb-4">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="rounded-full"/>
          ) : (
            <p>Loading avatar...</p>
          )}
        </div>
        {user.userName}
        <div className="flex-col">
        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-4" />
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="w-20 h-20 rounded-full" />
            <button type="button" onClick={handleUpload} className="mt-2 p-2 bg-slate-600 text-white rounded-md hover:bg-sky-700">
              Upload
            </button>
          </div>
        )}</div>
      </div>
      
      <div className="flex-auto bg-slate-500 p-4 rounded-xl text-slate-950">
        <div className="flex gap-10 mb-10">
          <div className="flex flex-col w-1/2">
            <label className="text-2xl">Username</label>
            <input
              className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-2xl">FullName</label>
            <input
              className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-10 mb-10">
          <div className="flex flex-col w-1/2">
            <label className="text-2xl">Email</label>
            <input
              className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-2xl">Phone</label>
            <input
              className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-10 mb-10">
          <div className="flex flex-col w-1/2">
            <label className="text-2xl">City</label>
            <input
              className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-2xl">Country</label>
            <input
              className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
              type="text"
              name="country"
              value={user.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-10 mb-10">
          <label className="text-2xl">Gender</label>
          <select
            className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <option value={1}>Nam</option>
            <option value={2}>Nữ</option>
            <option value={3}>Khác</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col mb-4">
          <button
            type="submit"
            className="px-40 py-2 bg-slate-600 text-white rounded-md hover:bg-sky-700"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Info;
