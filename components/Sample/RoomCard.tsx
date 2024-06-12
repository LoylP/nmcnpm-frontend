import Image from "next/image";
import { Room } from "./RoomData";
import { Space } from "./RoomData";

interface RoomCardProps {
  room: Room;
  onRoomClick: (room: Room) => void;
}
const RoomCard: React.FC<RoomCardProps> = ({ room, onRoomClick }) => {
  const { src, title, type } = room;

  return (
    <div className="card" onClick={() => onRoomClick(room)}>
      <div className="relative w-full h-72">
        <Image
          src={src}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="p-4 text-white bg-slate-800">
        <h4>{title}</h4>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default RoomCard;
