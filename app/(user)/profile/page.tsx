"use client";
import React from "react";
import Image from "next/image";
const Page = () => {
  return (
    <div className="flex mt-4 gap-4 p-2 bg-slate-300">
      <div className="p-4 rounded-xl font-bold h-1/2 bg-slate-500">
        <div className="w-60 h-60 relative rounded-md overflow-hidden mb-4">
          <Image src="/avt_admin.webp" alt="" fill />
        </div>
        LoylP
      </div>
      <div className="flex-auto bg-slate-500 p-4 rounded-xl">
        <div className="text-2xl">Username</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="username"
          placeholder="user"
        />
        <div className="text-2xl mt-2">FullName</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="fullname"
          placeholder="fullname"
        />
        <div className="text-2xl mt-2">Email</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="email"
          placeholder="email"
        />
        {/* <div className="text-2xl">Password</div>
        <input
          className="p-2 rounded-md mx-2 bg-slate-600 text-gray-300"
          type="password"
          name="password"
        /> */}
        <div className="text-2xl mt-2">Phone</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="phone"
          placeholder="phone"
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
          placeholder="city"
        />
        <div className="text-2xl mt-2">Country</div>
        <input
          className="p-2 rounded-md mx-2 text-xl bg-slate-600 text-gray-300"
          type="text"
          name="country"
          placeholder="country"
        />
      </div>
    </div>
  );
};

export default Page;
