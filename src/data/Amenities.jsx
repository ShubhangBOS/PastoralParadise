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
import Piano from "@/svg/ameneties/piano";
import Pool from "@/svg/ameneties/pool";
import PoolTable from "@/svg/ameneties/pool-table";
import Ski from "@/svg/ameneties/ski";
import SmokeAlarm from "@/svg/ameneties/smoke-alarm";
import Tv from "@/svg/ameneties/tv";
import WashingMachine from "@/svg/ameneties/washing-machine";
import Wifi from "@/svg/ameneties/wifi";
import Workplace from "@/svg/ameneties/workplace";

export const AmenetiesType = [
  {
    type: "basic",
    data: [
      { name: "Wifi", svgPath: <Wifi />, id: "wifi" },
      { name: "TV", svgPath: <Tv />, id: "tv" },
      { name: "Kitchen", svgPath: <Kitchen />, id: "kitchen" },
      {
        name: "Washing Machine",
        svgPath: <WashingMachine />,
        id: "washingMachine",
      },
      {
        name: "Free parking on premises",
        svgPath: <Parking />,
        id: "freeParking",
      },
      {
        name: "Paid parking on premises",
        svgPath: <PaidParking />,
        id: "paidParking",
      },
      { name: "Air conditioning", svgPath: <Ac />, id: "airConditioner" },
      {
        name: "Dedicated workplace",
        svgPath: <Workplace />,
        id: "dedicatedWorkout",
      },
    ],
  },
  {
    type: "advanced",
    data: [
      { name: "Pool", svgPath: <Pool />, id: "swimmingPool" },
      { name: "Hot tub", svgPath: <HotTub />, id: "hotTub" },
      { name: "Patio", svgPath: <Patio />, id: "patio" },
      { name: "BBQ grill", svgPath: <Bbq />, id: "bbqGrill" },
      {
        name: "Outdoor dining area",
        svgPath: <OutdoorDining />,
        id: "outdoorDinningArea",
      },
      { name: "Fire pit", svgPath: <FirePit />, id: "firePit" },
      { name: "Pool table", svgPath: <PoolTable />, id: "poolTable" },
      {
        name: "Indoor fireplace",
        svgPath: <IndoorFirplace />,
        id: "indoorFireplace",
      },
      { name: "Piano", svgPath: <Piano />, id: "piano" },
      { name: "Exercise equipment", svgPath: <Gym />, id: "exerciseEquipment" },
      { name: "Lake access", svgPath: <Lake />, id: "lakeAccess" },
      { name: "Beach access", svgPath: <Beach />, id: "beachAccess" },
      { name: "Ski-in/Ski-out", svgPath: <Ski />, id: "skiIn_SkiOut" },
      {
        name: "Outdoor shower",
        svgPath: <OutdoorShower />,
        id: "outdoorShower",
      },
    ],
  },
  {
    type: "safety",
    data: [
      { name: "Smoke alarm", svgPath: <SmokeAlarm />, id: "smokeAlarm" },
      { name: "First aid kit", svgPath: <FirstAid />, id: "firstAidKit" },
      {
        name: "carbonMonoOxideAlarm",
        svgPath: <FireExt />,
        id: "fireExtinguisher",
      },
      {
        name: "Carbon monoxide alarm",
        svgPath: <CarbonMonoxideAlarm />,
        id: "carbonMonoOxideAlarm",
      },
    ],
  },
];
