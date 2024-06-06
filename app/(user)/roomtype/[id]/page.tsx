"use client"
import Header from "@/components/Nav/Header";
import Menu from "@/components/Nav/Menu";
import { GET, POST, convertImagePath } from "@/app/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

  
interface Room{
    id: number;
    roomNumber: number;
    active: boolean;
    discount: number;
    booked: boolean;
}

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
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
    const [selectedRoomType, setSelectedRoomType] = useState<Room | null>(null);
    const [error, setError] = useState<string | null>(null);
      
    useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await GET(`v1/room/get_room/room_type/${params.id}`);
        const data = await res.data;
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
        <div className="flex ">
        <Menu />
      <main className="flex-1 md:col-span-4 bg-slate-700">
        <div className="w-full ">
          <div className="w-full bg-black opacity-60 text-white">
            <Header services={services} isUser={true} />
          </div>
        </div>

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