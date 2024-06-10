"use client";

interface roomType {
    id: number;
    name: string;
    capacity: number;
    desc: string;
    priceBase: number;
}

interface Room {
    id: number;
    roomNumber: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    roomType: roomType
}

const Page = () => {
    return (
        <></>
    )
};

export default Page;
