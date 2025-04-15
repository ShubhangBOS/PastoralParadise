import { useAppStore } from "@/store/store";
import React from "react";

const FloorPlan = () => {
  const {
    no_Bathroom,
    no_BedRoom,
    no_Guest,
    setBathroom,
    setBedRoom,
    setGuest,
  } = useAppStore();

  const handleIncrement = (type) => {
    if (type === "bedroom") setBedRoom(no_BedRoom + 1);
    else if (type === "bathroom") setBathroom(no_Bathroom + 1);
    else if (type === "guest") setGuest(no_Guest + 1);
  };

  const handleDecrement = (type) => {
    if (type === "bedroom" && no_BedRoom > 0) setBedRoom(no_BedRoom - 1);
    else if (type === "bathroom" && no_Bathroom > 0)
      setBathroom(no_Bathroom - 1);
    else if (type === "guest" && no_Guest > 0) setGuest(no_Guest - 1);
  };

  const data = [
    { label: "bedroom", value: no_BedRoom },
    { label: "bathroom", value: no_Bathroom },
    { label: "guest", value: no_Guest },
  ];
  return (
    <div className="flex justify-center items-center h-full flex-col gap-5">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="font-semibold text-4xl">
          Share some basics about your place
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quod
          ex tempora, tenetur cumque provident.
        </p>
      </div>
      <div className="flex flex-col w-[40%] gap-5">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex justify-between w-full text-lg items-center"
          >
            <span className="capitalize">{item.label}</span>
            <div className="flex gap-10 items-center justify-between w-48">
              <button
                className="border border-gray-200 py-[10px] rounded-full px-5 flex items-center justify-center hover:border-gray-500"
                onClick={() => handleDecrement(item.label)}
              >
                -
              </button>
              <button>{item.value}</button>
              <button
                className="border border-gray-200 py-[10px] rounded-full px-5 flex items-center justify-center hover:border-gray-500"
                onClick={() => handleIncrement(item.label)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorPlan;
