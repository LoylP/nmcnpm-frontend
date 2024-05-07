"use client";
import { BiHomeAlt, BiBrightness } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import { POST } from "@/app/api/route";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const body = {
        userName: userName,
        password: password,
        email: email,
        fullName: fullName,
        phone: phone,
        gender: gender,
        salary: 1,
      };
      const res = await POST({ body }, "v1/auth/register");

      const data = await res.json();

      console.log(data); // Đảm bảo console.log hoạt động

      // Redirect hoặc điều hướng người dùng đến trang khác
      // Ví dụ: router.push("/dashboard");
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="absolute inset-0 flex  p-5 border-slate-500 bg-slate-400">
      <div className="flex items-start p-5 rounded-lg w-1/5 mb-5 bg-slate-400 ">
        <Link href="../">
          {" "}
          <button
            type="submit"
            className="mx-2 my-2 text-white rounded-md hover:bg-gray-700 flex items-center"
          >
            <BiHomeAlt className="text-5xl text-white mr-2" />
            <p className="text-white text-3xl font-normal">Home</p>
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center  bg-slate-100 p-5 rounded-lg shadow-lg mb-0 mx-20 w-1/2">
        <h2 className="text-3xl font-bold mb-4 ">Create an Account</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mx-14">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border rounded-md"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4 mx-14">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 w-full border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="mt-1 p-2 w-full border rounded-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="mt-1 p-2 w-full border rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-600"
              >
                Gender
              </label>
              <select
                id="gender"
                className="mt-1 p-2 w-full border rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-40 py-2 bg-sky-800 text-white rounded-md hover:bg-slate-700"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <p className="text-sm font-light text-black dark:text-black mt-6 flex justify-center">
          Already have an account{" "}
          <Link
            href="../login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-slate-800 mx-2"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
