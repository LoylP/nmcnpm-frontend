"use client";
import { BiHomeAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GET_ALL_COUNTRY, POST } from "@/app/utils";
import { useRouter } from "next/navigation";
import { message } from "antd";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState<string | number>("male");
  const [errorMessage, setErrorMessage] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Registration successful! Please login to continue.',
    });
  };

  const errorMessageApi = () => {
    messageApi.open({
      type: 'error',
      content: 'Registration failed! Please try again.',
    });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const all_countries = await GET_ALL_COUNTRY();
      console.log(all_countries)
      if (all_countries) {
        setCountries(Array.from(all_countries.keys()));
        // setCity(countryResponse.get(user?.country))
      } else {
        setErrorMessage("Failed to fetch countries");
      }
    }

    fetchCountries()
  }, [])
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
        country: country,
        salary: 1,

      };

      let genderId;
      if (body.gender == "Male") genderId = 1;
      else if (body.gender == "Female") genderId = 2;
      else genderId = 3;
      body.gender = genderId;
      const res = await POST({ body }, "v1/auth/register");

      const data = await res.json();

      if (data.error == 0) {
        success()
        setErrorMessage("");
        setTimeout(() => router.push("/login"), 500)
        return;
      }

    } catch (error) {
      errorMessageApi()
      console.error("Error registering:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };


  return (
    <>
      {contextHolder}
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="">Others</option>
                </select>
              </div>
              <div className="mb-4 mx-14">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-600"
                >
                  Country
                </label>
                <select
                  className="mt-1 p-2 w-full border rounded-md"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
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
    </>
  );
};

export default RegisterPage;
