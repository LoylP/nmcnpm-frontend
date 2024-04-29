import Image from "next/image";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Room } from "./RoomData";

interface RoomCardProps {
  room: Room;
  onRoomClick: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onRoomClick }) => {
  const { src, title, type } = room;

  return (
    <div className="card" onClick={() => onRoomClick(room)}>
      <div className="relative w-full h-40">
        <Image
          src={src}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="p-4 text-white bg-sky-800">
        <h4>{title}</h4>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default RoomCard;
