"use client";
import React, { useEffect, useState } from "react";
import { GET, PATCH, POST_UPLOAD, GET_ALL_COUNTRY, DELETE } from "@/app/utils";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Modal, message, Table } from 'antd';
import { styled } from '@mui/material/styles';
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  id: number;
  userName: string;
  phone: string;
  email: string;
  fullName: string;
  city: string;
  country: string;
  gender: number;
  salary: number;
}

interface Room {
  id: number;
  roomNumber: number;
  discount: number;
}

interface RoomDetail {
  id: number;
  numberUsers: number;
  checkIn: string;
  room: Room;
  bill: Bill;
}

interface Bill {
  id: number;
  paid: boolean;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const { Column } = Table;
interface DataType {
  key: React.Key;
  id: number,
  roomNumber: number,
  checkIn: Date,
  billId: string | number,
  priceAll: number | string,
  paid: string,
  action: string,
}

const Info = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [city, setCity] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [roomDetail, setRoomDetail] = useState<RoomDetail[]>([]);
  const [countryResponse, setCountryResponse] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [roomDetailSource, setRoomDetailSource] = useState<DataType[] | null>(null);

  const successMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  const errorMessage = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const showModal = (roomDetail: RoomDetail[]) => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBooked = await GET("v1/room_detail")
        setRoomDetail(resBooked.data)
        const res = await GET("v1/user");
        if (res.statusCode == 401) {
          router.push("/login")
          return;
        }
        const data = res;
        // @ts-ignore
        const roomDetailFilter: DataType[] = resBooked.data.map((cur, idx) => {
          let billId: string | number = "None", paid: boolean = false;
          let paidString: string;
          let priceAll: string = "None";
          if (cur.bill != null) {
            billId = cur.bill.id;
            paid = cur.bill.paid;
            priceAll = cur.bill.priceAll;
          }

          if (paid) {
            paidString = "YES";
          } else {
            paidString = "NO";
          }
          console.log(cur)
          return {
            key: idx,
            id: cur.id,
            roomNumber: cur.room.roomNumber,
            checkIn: new Date(cur.checkIn).toLocaleString(),
            billId: billId,
            priceAll: priceAll,
            paid: paidString,
          }
        })
        setRoomDetailSource(roomDetailFilter);
        if (data && data.data && data.data.length > 0) {
          setUser(data.data[0]);
        }
        const avatarPath = await GET("v1/user/user_avatar");
        const all_countries = await GET_ALL_COUNTRY();
        if (all_countries) {
          setCountryResponse(all_countries);
          setCountries(Array.from(all_countries.keys()));
          // setCity(countryResponse.get(user?.country))
          setCity(all_countries.get(data.data[0].country));
        } else {
          setError("Failed to fetch countries");
        }

        if (avatarPath) {
          const splitStr = avatarPath.result.split("/");
          if (splitStr[0] === "images") {
            avatarPath.result = avatarPath.result.replace("images", "static");
          }
          setAvatar(`${process.env.NEXT_PUBLIC_IMAGES_FOLDER}${avatarPath.result}`);
        } else {
          setError("Failed to fetch user avatar");
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

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setUser(prevUser => prevUser ? { ...prevUser, country: selectedCountry, city: '' } : null);
    setCity(countryResponse.get(selectedCountry) || []);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setUser(prevUser => prevUser ? { ...prevUser, city: selectedCity } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        if (typeof (user.gender) === "string") {
          user.gender = parseInt(user.gender);
        }
        user.salary = 1;
        const res = await PATCH("v1/user", user);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error response from server:", errorText);
          throw new Error("Failed to update user");
        }

        const data = await res.json();
        if (data.status === 200) {
          setError(null);
          successMessage('Update profile successfully!');
          setTimeout(() => location.reload(), 500)
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
      const previewUrl = URL.createObjectURL(file);
      setSelectedFile(file);
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
        if (res.error == 0) {
          location.reload()
          setAvatar(`${process.env.NEXT_PUBLIC_IMAGES_FOLDER}${data.result}`);
          setPreview(null);
          setSelectedFile(null);
        } else {
          setError(data.message || "Failed to upload avatar");
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
        setError("Failed to upload avatar");
      }
    }
  };

  const handleDelete = async (billId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to cancel this room?"
      );
      if (!confirmDelete) return;

      const res = await DELETE(
        {},
        `v1/room_detail/delete/${billId}`
      );
      const data = await res.json()
      if (data.error == 0) {
        successMessage('Cancel room booking Successfully!');
        setTimeout(() => {
          location.reload();
        }, 500)
      } else {
        errorMessage(data.message)
        console.error("Failed to delete service:", await res.json());
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {contextHolder}
      <button onClick={() => showModal(roomDetail)} className="gap-4 bg-green-500 rounded-md mx-2">
        <div className="mx-2 my-1">View Room Booked</div>
      </button>
      {roomDetailSource && (
        <Modal width={"50%"} className="text-center" title="Room Booked" open={isModalOpen} onOk={handleCancel} onCancel={handleCancel}>
          <Table dataSource={roomDetailSource}>
            <Column title="Room Number" dataIndex="roomNumber" key="roomNumber" />
            <Column title="CheckIn" dataIndex="checkIn" key="checkIn" />
            <Column title="BillId" dataIndex="billId" key="billId" />
            <Column title="PriceAll" dataIndex="priceAll" key="priceAll" />
            <Column
              title="Paid"
              dataIndex="paid"
              key="paid"
              filters={[{ text: 'YES', value: 'YES' }, { text: 'NO', value: 'NO' },]}
              onFilter={(value, record: DataType) => record.paid === value}
              // @ts-ignore
              sorter={(a, b) => a.paid < b.paid}
              defaultSortOrder={"descend"}
              render={(_, record: DataType) => (
                <span style={{ color: record.paid == "YES" ? 'green' : 'red' }} className="font-bold">
                  {record.paid == "YES" ? 'YES' : 'NO'}
                </span>
              )}
            />
            <Column
              title="Action"
              dataIndex="action"
              key="action"
              render={(_, record: DataType) => (
                record.paid == "NO" ? (
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="mx-2 text-red-300 hover:text-red-500 font-bold"
                  >
                    Cancel
                  </button>
                ) : null
              )}
            />
          </Table>
        </Modal>
      )}
      <form onSubmit={handleSubmit} className="flex mt-4 gap-4 p-2 bg-slate-700">
        <div className="p-4 rounded-xl font-bold h-1/2 bg-slate-500 text-white">
          <div className="w-72 h-72 relative rounded-md overflow-hidden mb-4">
            {avatar ? (
              <Image loader={() => avatar} alt="User Avatar" className="rounded-full" src={avatar} width={280} height={340} />
            ) : (
              <p>Loading avatar...</p>
            )}
          </div>
          <div className="flex-col">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="w-20 h-20 rounded-full" />
                <button type="button" onClick={handleUpload} className="mt-2 p-2 bg-slate-600 text-white rounded-md hover:bg-sky-700">
                  Upload
                </button>
              </div>
            )}

          </div>
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
              <select
                className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
                name="city"
                value={user.city}
                onChange={handleCityChange}
              >
                {city.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-2xl">Country</label>
              <select
                className="p-2 rounded-md text-xl bg-slate-300 text-gray-500"
                name="country"
                value={user.country}
                onChange={handleCountryChange}
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
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
              <option value={1}>Male</option>
              <option value={2}>Female</option>
              <option value={3}>Other</option>
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
    </>
  );
};

export default Info;
