import Bed1 from "../../public/statics/images/1bed.jpg";
import Bed1Basic from "../../public/statics/images/1bed_basic.jpg";
import Bed2 from "../../public/statics/images/2bed.jpg";
import Bed2Basic from "../../public/statics/images/2bed_basic.jpg";
import SingleBed from "../../public/statics/images/1single_bed.jpg";
import SingleBed2 from "../../public/statics/images/2single_bed.jpg";
import BedVip from "../../public/statics/images/vip.jpg";
import Bar from "../../public/statics/images/bar.jpg";
import Swim from "../../public/statics/images/swim.jpg";
import Activities from "../../public/statics/images/activities.jpg";
import Lobby from "../../public/statics/images/lobby.jpg";
import { StaticImageData } from "next/image";

export interface Room {
  src: StaticImageData;
  title: string;
  type: string;
}

export const RoomData: Room[] = [
  {
    src: Bed1Basic,
    title: "1 giường đôi",
    type: "Standard",
  },
  {
    src: Bed2Basic,
    title: "2 giường đôi",
    type: "Standard",
  },
  {
    src: SingleBed,
    title: "1 giường đơn",
    type: "Standard",
  },
  {
    src: SingleBed2,
    title: "2 giường đơn",
    type: "Standard",
  },
  {
    src: Bed1,
    title: "1 giường đôi",
    type: "Superior",
  },
  {
    src: Bed2,
    title: "2 giường đôi",
    type: "Superior",
  },
  {
    src: BedVip,
    title: "Phòng VIP ",
    type: "Luxury",
  },
  {
    src: Lobby,
    title: "Sảnh khách sạn",
    type: "Lobby",
  },
  {
    src: Swim,
    title: "Hồ bơi",
    type: "Service",
  },
  {
    src: Activities,
    title: "Activities",
    type: "Service",
  },
  {
    src: Bar,
    title: "Bar",
    type: "Service",
  },
];
