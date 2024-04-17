"use client";
import { BiBrightness } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";

const RegisterPage = () => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fullname && username && password) {
      console.log("Register successful");
    } else {
      setErrorMessage("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-2/5 h-full"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/a7/c4/32/a7c4321221cd2f608bbd935d0edb1f66.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center mx-10 mt-40">
          <h1 className="text-gray-100 text-6xl font-normal">
            Good Hotel for good experience
          </h1>
        </div>
        <p className="text-gray-200 text-2xl font-normal mx-10 mt-5">
          Find your perfect room and explore the place
        </p>
      </div>

      {/* Login Form */}
      <div className="absolute right-0 w-3/5 h-full p-16 border-2 border-slate-500 bg-slate-400">
        <div className="flex items-center mb-5">
          <BiBrightness className="text-4xl text-gray-700 mr-4" />
          <h1 className="text-gray-700 text-2xl font-normal">
            Interactive Brand
          </h1>
        </div>
        <div className="flex flex-col bg-slate-100 p-10 rounded-lg shadow-lg mb-0 mx-20">
          <h2
            className="text-4xl font-bold mb-6 mx-14 "
            style={{ marginBottom: "10px" }}
          >
            Create an Account
          </h2>

          {errorMessage && (
            <p
              className="text-red-500 mb-4"
              style={{ marginLeft: "50px", width: "350px" }}
            >
              {errorMessage}{" "}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 mx-14">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-600"
              >
                FullName
              </label>
              <input
                type="text"
                id="fullname"
                className="mt-1 p-2 w-full border rounded-md"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: "367.6px" }}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "367.6px" }}
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
                style={{ width: "367.6px" }}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "367.6px" }}
              />
            </div>

            <div className="flex justify-end mx-14" style={{ width: "380px" }}>
              <button
                type="submit"
                className="px-40 py-2 bg-sky-800 text-white rounded-md hover:bg-slate-700"
              >
                Sign up
              </button>
            </div>
            <p className="text-sm font-light text-black dark:text-black mt-6 flex justify-center">
              Already have an account{" "}
              <Link
                href="../Login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-slate-800 mx-2"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
