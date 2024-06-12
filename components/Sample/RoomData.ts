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
import Breakfast from "../../public/statics/images/breakfast.jpg";
import Spa from "../../public/statics/images/spa.jpg";
import BBQ from "../../public/statics/images/BBQ.jpg";
import Acti from "../../public/statics/images/acti.jpg";
import Acti2 from "../../public/statics/images/acti2.jpg";
import Acti3 from "../../public/statics/images/acti3.jpg";
import Beach from "../../public/statics/images/beach.jpg";
import Chill from "../../public/statics/images/chill.jpg";
import Forest from "../../public/statics/images/forest.jpg";
import Pastiness from "../../public/statics/images/pastiness.jpg";
import Restaurant from "../../public/statics/images/restau.jpg";
import Slings from "../../public/statics/images/slings.jpg";
import Swiming from "../../public/statics/images/swimhotel.jpg";
import Waterfall from "../../public/statics/images/waterfall.jpg";
import Game from "../../public/statics/images/games.jpg";

import { StaticImageData } from "next/image";

export interface Room {
  src: StaticImageData;
  title: string;
  type: string;
}

export interface Space {
  src: StaticImageData;
  title: string;
}

export interface Explore {
  src: StaticImageData;
  title: string;
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
];

export const SpaceData: Space[] = [
  {
    src: Lobby,
    title: "Lobby",
  },
  {
    src: Swim,
    title: "Swim",
  },
  {
    src: Activities,
    title: "Activities",
  },
  {
    src: Bar,
    title: "Bar",
  },
  {
    src: Breakfast,
    title: "Breakfast",
  },
  {
    src: Spa,
    title: "Spa",
  },
  {
    src: BBQ,
    title: "BBQ",
  },
];

export const ExploreData: Explore[] = [
  {
    src: Chill,
    title: "Space for chill",
  },
  {
    src: Forest,
    title: "Forest",
  },
  {
    src: Swiming,
    title: "Swim",
  },
  {
    src: Game,
    title: "Game",
  },
  {
    src: Slings,
    title: "Slings",
  },
  {
    src: Restaurant,
    title: "Restaurant",
  },
  {
    src: Beach,
    title: "Beach",
  },
  {
    src: Pastiness,
    title: "Pastiness",
  },
  {
    src: Waterfall,
    title: "Waterfall",
  },
  {
    src: Acti,
    title: "Activities",
  },
  {
    src: Acti2,
    title: "Activities",
  },
  {
    src: Acti3,
    title: "Activities",
  },
];