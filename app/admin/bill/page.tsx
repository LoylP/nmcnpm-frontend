"use client";
import { GET, POST } from "@/app/utils";
import { Divider, message } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableProps, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Modal } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface User {
    id: number;
    userName: string;
    phone: string;
    email: string;
    fullName: string;
}

interface Bill {
    id: number;
    priceAll: number;
    paid: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Room {
    id: number;
    roomNumber: number;
    active: boolean;
    discount: number;
    booked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface BillBackend {
    id: number;
    numberUsers: number;
    checkIn: Date;
    checkOut: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    room: Room;
    bill: Bill;
}

interface BillDataType {
    key: React.Key;
    id: number;
    userName: string;
    fullName: string;
    phone: string;
    email: string;
    checkIn: Date;
    priceAll: number | string;
    paid: string;
    roomNumber: number
}

type DataIndex = keyof BillDataType;

interface BillExtractFromBackend {
    id: number;
    priceAll: number;
    checkIn: Date;
    checkOut: Date;
    fullName: string;
    phone: string;
    email: string;
    roomNumber: number
}

const Page = () => {
    const [billsData, setBillsData] = useState<BillDataType[] | null>(null);
    const [selectedRoomDetailId, setSelectedRoomDetailId] = useState<number | null>(null);
    const [selectedBill, setSelectedBill] = useState<BillExtractFromBackend | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const searchInput = useRef<InputRef>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef<HTMLDivElement>(null);

    const showModal = async (id: number) => {
        setSelectedRoomDetailId(id);
        setOpen(true);
        const res = await POST({}, `v1/admin/roomdetail/bill/${id}`)
        const data = await res.json();
        if (data.statusCode == 401) {
            router.push("/login");
            return;
        }
        if (data.error == 1) {
            error(data.message);
            setSelectedBill(null)
            setTimeout(() => setOpen(false), 700)
            return;
        }
        const billData = data.data;
        console.log(billData)
        const billExtracted: BillExtractFromBackend = {
            id: billData.id,
            priceAll: billData.priceAll ?? billData.bill.priceAll,
            checkIn: billData.roomDetail.checkIn,
            checkOut: billData.roomDetail.checkOut,
            fullName: billData.roomDetail.user.fullName,
            phone: billData.roomDetail.user.phone,
            email: billData.roomDetail.user.email,
            roomNumber: billData.roomDetail.room.roomNumber
        }
        setSelectedBill(billExtracted);
        sucess(`Get bill of roomDetail=${id} successfully!`)
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
        setSelectedRoomDetailId(null);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
        setSelectedRoomDetailId(null);
    };

    const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };


    useEffect(() => {
        const fetchAllBills = async () => {
            const data = await GET("v1/admin/room_detail");
            if (data.statusCode == 401) {
                router.push("/login");
                return;
            }
            console.log(data.data)
            if (data.data) {
                const bills: BillDataType[] = data.data.map((cur: BillBackend, idx: number) => {
                    let paidString: string = "", priceString: string | number = "";
                    if (cur.bill == null) {
                        paidString = "None";
                        priceString = "None";
                    } else {
                        paidString = cur.bill.paid ? "Paid" : "Not paid";
                        priceString = cur.bill.priceAll;
                    }
                    console.log("cur: ", cur)
                    return {
                        key: idx + cur.id,
                        id: cur.id,
                        userName: cur.user.userName,
                        fullName: cur.user.fullName,
                        phone: cur.user.phone,
                        email: cur.user.email,
                        priceAll: priceString,
                        checkIn: cur.checkIn,
                        paid: paidString,
                        roomNumber: cur.room.roomNumber
                    }
                })
                setBillsData(bills);
            }
        }
        fetchAllBills();
    }, [])

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<BillDataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const sucess = (message: string) => {
        messageApi.open({
            type: "success",
            content: message,
        });
    }

    const error = (message: string) => {
        messageApi.open({
            type: "error",
            content: message,
        });
    }

    const handlePayBill = async (id: number) => {
        const confirm = window.confirm(`Are you sure to pay bill for roomDetailId=${id}`)
        if (!confirm) {
            return;
        }
        const res = await POST({}, `v1/admin/roomdetail/payBill/${id}`)
        const data = await res.json();
        if (data.statusCode == 401) {
            router.push("/login");
            return;
        }
        if (data.error == 0) {
            sucess(data.message);
            location.reload()
        } else {
            error("Something Wrong, please try again later!");
        }
    }

    let dataSource: BillDataType[] = [];
    if (billsData) {
        dataSource = billsData;
    }

    const columns: TableProps<BillDataType>['columns'] = [
        {
            title: "Room Number",
            dataIndex: "roomNumber",
            key: "roomNumber",
            render: (roomNumber) => <span className="flex justify-center items-center font-bold text-cyan-500">{roomNumber}</span>,
        },
        {
            title: "UserName",
            dataIndex: "userName",
            key: "userName",
            width: '15%',
            ...getColumnSearchProps('userName'),
        },
        {
            title: "FullName",
            dataIndex: "fullName",
            key: "fullName",
            width: '15%',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: '15%',
            ...getColumnSearchProps('phone'),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: '15%',
            ...getColumnSearchProps('email'),
        },
        {
            title: "CheckIn",
            dataIndex: "checkIn",
            key: "checkIn",
            render: (checkIn) => {
                return (
                    <span className="flex justify-center items-center font-bold text-cyan-500">{new Date(checkIn).toLocaleString()}</span>
                )
            },
        },
        {
            title: "PriceAll",
            dataIndex: "priceAll",
            key: "priceAll",
            render: (priceAll) => <a>{priceAll}</a>,
        },
        {
            title: "Paid",
            dataIndex: "paid",
            key: "paid",
            filters: [
                { text: 'Not paid', value: 'Not paid' },
                { text: 'Paid', value: 'Paid' },
                { text: 'None', value: 'None' }
            ],
            onFilter: (value, record) => record.paid === value,
            render: (paid) => <a className={`${paid === "Paid" ? "text-green-500" : "text-red-500"} font-bold`}>{paid}</a>,
        },
        {
            title: "Get Bill",
            key: "getBill",
            render: (record: BillDataType) => {
                return (
                    <>
                        <Button className="bg-yellow-100" onClick={() => showModal(record.id)}>Bill</Button>
                        {selectedRoomDetailId === record.id && (
                            <Modal
                                title={
                                    <div
                                        style={{
                                            width: '100%',
                                            cursor: 'move',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onMouseOver={() => setDisabled(false)}
                                        onMouseOut={() => setDisabled(true)}
                                    >
                                        Bill of room detail: {selectedRoomDetailId}
                                    </div>
                                }
                                open={open}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                modalRender={(modal) => (
                                    <Draggable
                                        disabled={disabled}
                                        bounds={bounds}
                                        nodeRef={draggleRef}
                                        onStart={(event, uiData) => onStart(event, uiData)}
                                    >
                                        <div ref={draggleRef}>{modal}</div>
                                    </Draggable>
                                )}
                            >
                                {
                                    selectedBill ? (
                                        <div>
                                            <Divider style={{ borderWidth: '1px' }} />
                                            <p className="my-2"><strong className="text-green-500">Price All:</strong> {selectedBill.priceAll}</p>
                                            <Divider style={{ borderWidth: '1px' }} />
                                            <p className="my-2"><strong className="text-green-500">Full Name:</strong> {selectedBill.fullName}</p>
                                            <p className="my-2"><strong className="text-green-500">Phone:</strong> {selectedBill.phone}</p>
                                            <p className="my-2"><strong className="text-green-500">Email:</strong> {selectedBill.email}</p>
                                            <Divider style={{ borderWidth: '1px' }} />
                                            <p className="my-2"><strong className="text-green-500">Room Number:</strong> {selectedBill.roomNumber}</p>
                                            <p className="my-2"><strong className="text-green-500">Check In:</strong> {new Date(selectedBill.checkIn).toLocaleString()}</p>
                                            <p ><strong className="text-green-500">Check Out:</strong> {new Date(selectedBill.checkOut).toLocaleString()}</p>
                                        </div>
                                    ) : null
                                }
                            </Modal>
                        )}
                    </>
                );

            }
        },
        {
            title: "Pay Bill",
            key: "Pay Bill",
            render: (record: BillDataType) => {
                return (
                    record.paid !== "Paid" ? (
                        <Button className="bg-red-300 w-full" onClick={() => {
                            handlePayBill(record.id)
                        }}>Pay</Button>
                    ) : (
                        <div className="flex justify-center">
                            <strong className="text-green-500 text-center">Done</strong>
                        </div>
                    )
                )
            }
        },
    ];

    return (
        <>
            {contextHolder}
            <div className="flex flex-col gap-2 bg-gray-200 my-10 rounded-xl">
                <div className="w-full my-4 ">
                    <div className="flex justify-center items-center my-4"><h1 className="text-2xl font-bold text-red-400">Bill Management</h1></div>
                    <Table columns={columns} dataSource={dataSource}/>
                </div>
            </div>
        </>
    )
};

export default Page;
