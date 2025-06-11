import Ac from "@/svg/ameneties/ac";
import Bbq from "@/svg/ameneties/bbq";
import Beach from "@/svg/ameneties/beach";
import CarbonMonoxideAlarm from "@/svg/ameneties/carbon-monoxide-alarm";
import FireExt from "@/svg/ameneties/fire-ext";
import FirePit from "@/svg/ameneties/fire-pit";
import FirstAid from "@/svg/ameneties/first-aid";
import Gym from "@/svg/ameneties/gym";
import HotTub from "@/svg/ameneties/hot-tub";
import IndoorFirplace from "@/svg/ameneties/indoor-firplace";
import Kitchen from "@/svg/ameneties/kitchen";
import Lake from "@/svg/ameneties/lake";
import OutdoorDining from "@/svg/ameneties/outdoor-dining";
import OutdoorShower from "@/svg/ameneties/outdoor-shower";
import PaidParking from "@/svg/ameneties/paid-parking";
import Parking from "@/svg/ameneties/parking";
import Patio from "@/svg/ameneties/patio";
import Pool from "@/svg/ameneties/pool";
import PoolTable from "@/svg/ameneties/pool-table";
import Ski from "@/svg/ameneties/ski";
import SmokeAlarm from "@/svg/ameneties/smoke-alarm";
import Tv from "@/svg/ameneties/tv";
import WashingMachine from "@/svg/ameneties/washing-machine";
import Wifi from "@/svg/ameneties/wifi";
import Workplace from "@/svg/ameneties/workplace";
import { Dumbbell } from "lucide-react";
import { Beef } from "lucide-react";
import { Piano } from "lucide-react";
import { BellElectric } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { WavesLadder } from "lucide-react";

export const AmenetiesType = [
  {
    type: "basic",
    data: [
      {
        name: "Wifi",
        imgSrc: "/PastoralParadiseIcon/Wifi Workplace.svg",
        id: "wifi",
      },
      {
        name: "TV",
        imgSrc: "/PastoralParadiseIcon/Entertainment.svg",
        id: "tv",
      },
      {
        name: "Kitchen",
        imgSrc: "/PastoralParadiseIcon/Kitchen.svg",
        id: "kitchen",
      },
      {
        name: "Washing Machine",
        imgSrc: "/PastoralParadiseIcon/WashingMachine.svg",
        id: "washingMachine",
      },
      {
        name: "Free parking on premises",
        imgSrc: "/PastoralParadiseIcon/Free Parking.svg",
        id: "freeParking",
      },
      {
        name: "Paid parking on premises",
        imgSrc: "/PastoralParadiseIcon/Parking.svg",
        id: "paidParking",
      },
      {
        name: "Air conditioning",
        imgSrc: "/PastoralParadiseIcon/AC.svg",
        id: "airConditioner",
      },
      {
        name: "Dedicated workplace",
        svgPath: <BriefcaseBusiness />,
        id: "dedicatedWorkout",
      },
    ],
  },
  {
    type: "advanced",
    data: [
      { name: "Pool", svgPath: <WavesLadder />, id: "swimmingPool" },
      {
        name: "Hot tub",
        imgSrc: "/PastoralParadiseIcon/HotTub.png",
        id: "hotTub",
      },
      { name: "Patio", imgSrc: "/PastoralParadiseIcon/Patio.svg", id: "patio" },
      { name: "BBQ grill", svgPath: <Beef />, id: "bbqGrill" },
      {
        name: "Outdoor dining area",
        imgSrc: "/PastoralParadiseIcon/OutdoorDiningArea.png",
        id: "outdoorDinningArea",
      },
      {
        name: "Fire pit",
        imgSrc: "/PastoralParadiseIcon/FirePit.svg",
        id: "firePit",
      },
      {
        name: "Pool table",
        imgSrc: "/PastoralParadiseIcon/TablePool.svg",
        id: "poolTable",
      },
      {
        name: "Indoor fireplace",
        imgSrc: "/PastoralParadiseIcon/IndoorFireplace.svg",
        id: "indoorFireplace",
      },
      { name: "Piano", svgPath: <Piano />, id: "piano" },
      {
        name: "Exercise equipment",
        svgPath: <Dumbbell />,
        id: "exerciseEquipment",
      },
      {
        name: "Lake access",
        imgSrc: "/PastoralParadiseIcon/LakeAccess.svg",
        id: "lakeAccess",
      },
      {
        name: "Beach access",
        imgSrc: "/PastoralParadiseIcon/TablePool.svg",
        id: "beachAccess",
      },
      {
        name: "Ski-in/Ski-out",
        imgSrc: "/PastoralParadiseIcon/Skiing.png",
        id: "skiIn_SkiOut",
      },
      {
        name: "Outdoor shower",
        imgSrc: "/PastoralParadiseIcon/Shower.svg",
        id: "outdoorShower",
      },
    ],
  },
  {
    type: "safety",
    data: [
      { name: "Smoke alarm", svgPath: <BellElectric />, id: "smokeAlarm" },
      {
        name: "First aid kit",
        imgSrc: "/PastoralParadiseIcon/First Aid Kit.svg",
        id: "firstAidKit",
      },
      {
        name: "Fire Extinguisher",
        imgSrc: "/PastoralParadiseIcon/Fire Extinguisher.svg",
        id: "fireExtinguisher",
      },
      {
        name: "Carbon monoxide alarm",
        imgSrc: "/PastoralParadiseIcon/CarbonMonoxideAlarm.png",
        id: "carbonMonoOxideAlarm",
      },
    ],
  },
];
