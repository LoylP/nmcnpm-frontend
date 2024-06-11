"use client";
import Menu from "@/components/Nav/Menu";
import Header from "@/components/Nav/Header";
import { GET, POST, convertImagePath } from "@/app/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Divider, Table, DatePicker, InputNumber, Select } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Modal, Form, message } from 'antd';
import Image from "next/image";
import moment from 'moment';
import en from 'antd/es/date-picker/locale/en_US';
import dayjs from 'dayjs';

interface Room {
  id: number;
  roomNumber: number;
  active: boolean;
  discount: number;
  booked: boolean;
}

interface DataType {
  key: React.Key;
  id: number;
  roomNumber: number;
  active: boolean;
  discount: number;
  available: boolean;
}

interface Service {
  id: number;
  name: string;
  price: number;
}

interface RoomService {
  id: number;
  quantity: number;
  service: Service;
}

interface RoomType {
  id: number;
  name: string;
  capacity: number;
  desc: string;
  priceBase: number;
  roomService: RoomService[];
  roomImage: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room[]>([]);
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<DataType | null>(null);
  const [numUsers, setNumUsers] = useState(1);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const services = [
    {name: "Home", url: "/"},
    {name: "Booking", url: "/booking"},
    {name: "Services", url: "#"},
    {name: "Explore", url: "#"},
    {name: "Rules", url: "#"},
  ];

  const successMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Booking Successfully!',
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Something wrong, please try again later!',
    });
  };

  const showModal = (roomType: RoomType) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleBookingModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Booking Details:', {
        roomId: selectedRoom?.id,
        numUsers: values.numUser,
        checkInDate: values.checkInDate.toISOString(),
      });
      const body = {
        roomId: selectedRoom?.id,
        numUser: values.numUser,
        checkIn: values.checkInDate.toISOString(),
      };
      const res = await POST({ body }, "v1/room_detail/create");
      const data = await res.json()
      console.log("data: ", data)
      if (data.error == 0) {
        successMessage();
        setIsBookingModalOpen(false);
        location.reload()
      } else {
        errorMessage();
        setError("Failed to book the room");
      }
    } catch (error) {
      console.error("Error booking room:", error);
      setError("Failed to book the room");
    }
  };

  const handleBookingModalCancel = () => {
    setIsBookingModalOpen(false);
  };

  const computedPrice = (roomType: RoomType) => {
    let price = roomType.priceBase;
    roomType.roomService.forEach((rs) => {
      price += rs.quantity * rs.service.price;
    });
    return price;
  };

  const handleDateChange = (date: moment.Moment | null, dateString: string) => {
    setCheckInDate(dateString);
  };

  const defaultValue = dayjs(Date.now());

  const buddhistLocale: typeof en = {
    ...en,
    lang: {
      ...en.lang,
      fieldDateFormat: 'YYYY-MM-DD',
      fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
      yearFormat: 'YYYY',
      cellYearFormat: 'YYYY',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomTypeRes = await GET(`v1/room_type/get_room_type/${params.id}`);
        if (roomTypeRes.statusCode === 401) {
          router.push("/login");
          return;
        }
        const roomTypeData = await roomTypeRes.data;
        setRoomType(roomTypeData);

        const res = await GET(`v1/room/get_room/room_type/${params.id}`);
        if (res.statusCode === 401) {
          router.push("/login");
          return;
        }
        const roomData = await res.data;
        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleBookNow = (room: DataType) => {
    if (!room.available) {
      return;
    }
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
      align: 'center',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      render: (active: boolean) => (
        <span style={{ color: active ? 'green' : 'red' }} className="font-bold">
          {active ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      align: 'center',
      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
      ],
      onFilter: (value, record) => record.available === value,
      render: (available: boolean) => (
        <span style={{ color: available ? 'green' : 'red' }} className="font-bold">
          {available ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      title: 'Booking',
      key: 'booking',
      align: 'center',
      render: (_, record) => (
        record.available ? (
          <Button className="bg-green-500" type="primary" onClick={() => handleBookNow(record)}>
            Book Now
          </Button>
        ) : null
      ),
    },
  ];

  const data: DataType[] = room.map((r) => ({
    key: r.id,
    id: r.id,
    roomNumber: r.roomNumber,
    active: r.active,
    discount: r.discount,
    available: !r.booked && r.active,
  }));

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      {contextHolder}
      <div className="flex bg-slate-500 min-h-screen">
        <Menu />
        <main className="flex-1 md:col-span-4">
          <div className="w-full  bg-black opacity-60 text-white mb-10">
            <Header services={services} isUser={true} />
          </div>
          {roomType && (
            <>
              <div className="flex flex-row w-[80%] mx-auto p-4 rounded-xl font-bold bg-slate-300 text-black hover:cursor-pointer transition-colors duration-200 hover:bg-sky-100">
                <div className="relative w-[40%] h-72 overflow-hidden mb-4">
                  <Image
                    // @ts-ignore
                    src={convertImagePath(roomType?.roomImage)}
                    alt={roomType?.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
                <div className="relative w-full lg:w-[55%] h-72 p-4 flex flex-col justify-between">
                  <div>
                    <b className="text-xl text-blue-800">{roomType?.name}</b>
                    <div className="flex text-gray-700 mt-2">
                      <b className="mr-2 text-blue-800">Capacity:</b>{roomType?.capacity}
                    </div>
                    <div className="mt-2 text-gray-700 overflow-hidden text-ellipsis break-words">Description: {roomType?.desc}</div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button className="bg-yellow-500 text-gray-600 px-2 rounded-xl">
                      Price: {computedPrice(roomType!)}
                    </button>
                    <Button
                      className="bg-green-600"
                      type="primary"
                      onClick={() => showModal(roomType!)}
                    >
                      More info...
                    </Button>
                  </div>
                </div>
              </div>
              <Modal
                className="text-center"
                title="Room Type Details"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {roomType && (
                  <div className="my-2 text-left">
                    <p><b className="text-sky-700">Name:</b> {roomType.name}</p>
                    <p><b className="text-sky-700">Capacity:</b> {roomType.capacity}</p>
                    <p><b className="text-sky-700">Description:</b> {roomType.desc}</p>
                    <p><b className="text-sky-700">Price Base:</b> {roomType.priceBase}</p>
                    <p><b className="text-sky-700">Services:</b></p>
                    <ul>
                      {roomType.roomService.map((rs) => (
                        <li key={rs.id}>
                          <p className="mx-4" key={rs.service.id}>{rs.service.name} - {rs.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Modal>
            </>
          )}

          <Divider className="bg-slate-500" />
          <div className="px-12 py-6 ">
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              showSorterTooltip={{ target: 'sorter-icon' }}
            />
          </div>
        </main>

        <Modal
          title="Book Now"
          visible={isBookingModalOpen}
          onOk={handleBookingModalOk}
          onCancel={handleBookingModalCancel}
          okText="Book"
        >
          <Form form={form} layout="vertical">
            <Form.Item label="NumUser" name="numUser">
              <InputNumber min={1} max={4} />
            </Form.Item>
            <Form.Item label="Checkin Date" name="checkInDate">
              <DatePicker
                showTime
                locale={buddhistLocale}
                //@ts-ignore
                onChange={onChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
