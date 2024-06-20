import Image from "next/image";
import { Explore } from "./RoomData";

interface ExploreCardProps {
  explore: Explore;
  onExploreClick: (explore: Explore) => void;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ explore, onExploreClick }) => {
  const { src, title } = explore;

  return (
    <div className="card" onClick={() => onExploreClick(explore)}>
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

export default ExploreCard;
