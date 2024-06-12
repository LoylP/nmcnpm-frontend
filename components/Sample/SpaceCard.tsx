import Image from "next/image";
import { Space } from "./RoomData";

interface SpaceCardProps {
  space: Space;
  onSpaceClick: (space: Space) => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space, onSpaceClick }) => {
  const { src, title } = space;

  return (
    <div className="card" onClick={() => onSpaceClick(space)}>
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
      </div>
    </div>
  );
};

export default SpaceCard;
