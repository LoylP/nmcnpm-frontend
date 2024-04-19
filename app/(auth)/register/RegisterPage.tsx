"use client";
import { BiHomeAlt, BiBrightness } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";
import { POST } from "@/app/api/route";

const RegisterPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");
  const [field, setField] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        userName: userName,
        password: password,
        email: email,
        fullName: fullName,
        phone: phone,
        gender: gender,
        salary: salary,
        city: city,
        country: country,
      };
      const res = await POST({ body }, "v1/auth/register");

      const data = await res.json();

      console.log(data);
      // Redirect hoặc điều hướng người dùng đến trang khác
      // Ví dụ: router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again.");
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
        <Link href="../">
          {" "}
          <button
            type="submit"
            className="mx-2 my-2 text-white rounded-md hover:bg-slate-700"
          >
            <BiHomeAlt className="text-5xl text-white mx-2 my-2" />
          </button>
        </Link>
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
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-600"
              >
                FullName
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
                htmlFor="Phone"
                className="block text-sm font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                type="text"
                id="Phone"
                className="mt-1 p-2 w-full border rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="Gender"
                className="block text-sm font-medium text-gray-600"
              >
                Gender
              </label>
              <input
                type="text"
                id="Gender"
                className="mt-1 p-2 w-full border rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="Salary"
                className="block text-sm font-medium text-gray-600"
              >
                Salary
              </label>
              <input
                type="text"
                id="Salary"
                className="mt-1 p-2 w-full border rounded-md"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="City"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="City"
                className="mt-1 p-2 w-full border rounded-md"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-4 mx-14">
              <label
                htmlFor="Country"
                className="block text-sm font-medium text-gray-600"
              >
                Country
              </label>
              <input
                type="text"
                id="Country"
                className="mt-1 p-2 w-full border rounded-md"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="flex justify-center w-full">
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
                href="../login"
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
