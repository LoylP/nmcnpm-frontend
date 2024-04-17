import Image from "next/image";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Room } from "./RoomData";

const RoomCard = ({ room }: { room: Room }) => {
  const { src, title, main, money } = room;

  return (
    <div className="card">
      <div className="relative w-full h-40">
        <Image
          src={src}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="p-4 text-white">
        <h4>{title}</h4>
        <p>{main}</p>
      </div>
      <div className="badge">
        <BiMoneyWithdraw />
        <p>{money}</p>
      </div>
    </div>
  );
};

export default RoomCard;
