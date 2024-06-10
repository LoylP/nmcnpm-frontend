"use client"
import Menu from "@/components/Nav/Menu";
import { GET, POST, convertImagePath } from "@/app/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Divider, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';


interface Room {
  id: number;
  roomNumber: number;
  active: boolean;
  discount: number;
  booked: boolean;
}

interface DataType {
  key: React.Key;

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
}

const services = [
  "Đặt phòng",
  "Thuê xe",
  "Dịch vụ",
  "Địa điểm tham quan",
  "Quy tắc chung",
];

export default function Page({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room[]>([]);
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const computedPrice = (roomType: RoomType) => {
    let price = roomType.priceBase;
    roomType.roomService.forEach((rs) => {
      price += rs.quantity * rs.service.price;
    });
    return price;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomTypeRes = await GET(`v1/room_type/get_room_type/${params.id}`);
        if (roomTypeRes.statusCode == 401) {
          router.push("/login");
          return;
        }
        const roomTypeData = await roomTypeRes.data;
        console.log(roomTypeData)
        setRoomType(roomTypeData);
        const res = await GET(`v1/room/get_room/room_type/${params.id}`);
        if (res.statusCode == 401) {
          router.push("/login");
          return;
        }

        const data = await res.data;
        console.log(data)
        // console.log(data)
        setRoom(data);
        if (data.length > 0) {
          const initialRoomTypeId = data[0].id;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value as string) === 0,
    },
  ];

  const roomColumns: TableColumnsType<DataType> = [

  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="flex bg-slate-700 min-h-screen">
      <Menu />
      <main className="flex-1 md:col-span-4 my-4">
        <div className="w-[50%] mx-auto">
          <div className="bg-white rounded-lg">
            <strong className="block text-center text-red-400">Room Type Name: {roomType?.name}</strong>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="m-2 text-left">
                {roomType && (
                  <>
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
                  </>
                )}
              </div>
              <div className="my-auto text-left">
                {roomType ? (
                  <strong>Estimate Price perday: {computedPrice(roomType)}</strong>
                ) : (
                  <strong>Loading...</strong>
                )}
              </div>
            </div>
          </div>
        </div>
        <Divider className="bg-white-500" />
        <div className="px-12 py-6">
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
          />
        </div>
      </main>
    </div>
  )
}