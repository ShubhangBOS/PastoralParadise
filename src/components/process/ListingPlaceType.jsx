import React from "react";
import House from "@/svg/lisitngTypes/house";
import Room from "@/svg/lisitngTypes/room";
import SharedRoom from "@/svg/lisitngTypes/shared-room";
import { useAppStore } from "@/store/store";

const ListingPlaceType = () => {
  const { placeType, setPlaceType } = useAppStore();
  const handleSelection = (place) => {
    setPlaceType(place);
  };
  const data = [
    {
      title: "An entire place",
      subTitle: "Guests have the whole place to themselves.",
      svg: <House />,
    },
    {
      title: "A room",
      subTitle:
        "Guests have their own room in a home, plus access to shared spaces.",
      svg: <Room />,
    },
    {
      title: "A shared room",
      subTitle:
        "Guests sleep in a room or common area that may be shared with you or others.",
      svg: <SharedRoom />,
    },
  ];
  return (
    <div className="flex items-center justify-center flex-col h-full gap-10">
      <h2 className="font-semibold text-4xl">
        Which of these best describes your place?
      </h2>
      <ul className="flex flex-col gap-5 w-[800px]">
        {data.map((place) => (
          <li
            key={place.title}
            className={`flex border border-gray-300 p-7 justify-between rounded-lg hover:border-gray-500 cursor-pointer ${
              placeType === place.title && "border-gray-950 bg-slate-100"
            }`}
            onClick={() => handleSelection(place.title)}
          >
            <div>
              <h4 className="font-semibold">{place.title}</h4>
              <p>{place.subTitle}</p>
            </div>
            {place.svg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingPlaceType;
