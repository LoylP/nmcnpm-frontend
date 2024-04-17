import Bed1 from "../../app/statics/images/1bed.jpg";
import Bed1Basic from "../../app/statics/images/1bed_basic.jpg";
import Bed2 from "../../app/statics/images/2bed.jpg";
import Bed2Basic from "../../app/statics/images/2bed_basic.jpg";
import SingleBed from "../../app/statics/images/1single_bed.jpg";
import SingleBed2 from "../../app/statics/images/2single_bed.jpg";
import BedVip from "../../app/statics/images/vip.jpg";
import Bar from "../../app/statics/images/bar.jpg";
import Swim from "../../app/statics/images/hoboi.jpg";
import Activities from "../../app/statics/images/activities.jpg";
import Lobby from "../../app/statics/images/lobby.jpg";
import { StaticImageData } from "next/image";

export interface Room {
  src: StaticImageData;
  title: string;
  main: string;
  money: string;
}

export const RoomData: Room[] = [
  {
    src: Bed1Basic,
    title: "1 giường đôi",
    main: "Standard",
    money: "???",
  },
  {
    src: Bed2Basic,
    title: "2 giường đôi",
    main: "Standard",
    money: "???",
  },
  {
    src: SingleBed,
    title: "1 giường đơn",
    main: "Standard",
    money: "???",
  },
  {
    src: SingleBed2,
    title: "2 giường đơn",
    main: "Standard",
    money: "???",
  },
  {
    src: Bed1,
    title: "1 giường đôi",
    main: "Superior",
    money: "???",
  },
  {
    src: Bed2,
    title: "2 giường đôi",
    main: "Superior",
    money: "???",
  },
  {
    src: BedVip,
    title: "Phòng VIP ",
    main: "Special",
    money: "???",
  },
  {
    src: Lobby,
    title: "Sảnh khách sạn",
    main: "Lobby",
    money: "???",
  },
  {
    src: Swim,
    title: "Hồ bơi",
    main: "Free",
    money: "???",
  },
  {
    src: Activities,
    title: "Activities",
    main: "Free",
    money: "???",
  },
  {
    src: Bar,
    title: "Bar",
    main: "Superior",
    money: "???",
  },
];
