import { useAppStore } from "@/store/store";
import React from "react";

const FloorPlan = () => {
  const {
    noBathroom,
    noBedRoom,
    noGuest,
    noPets,
    setBathroom,
    setBedRoom,
    setGuest,
    setPets,
  } = useAppStore();

  const handleIncrement = (type) => {
    if (type === "bedroom") setBedRoom(noBedRoom + 1);
    else if (type === "bathroom") setBathroom(noBathroom + 1);
    else if (type === "guest") setGuest(noGuest + 1);
    else if (type === "pets") setPets(noPets + 1);
  };

  const handleDecrement = (type) => {
    if (type === "bedroom" && noBedRoom > 0) setBedRoom(noBedRoom - 1);
    else if (type === "bathroom" && noBathroom > 0) setBathroom(noBathroom - 1);
    else if (type === "guest" && noGuest > 0) setGuest(noGuest - 1);
    else if (type === "pets" && noPets > 0) setPets(noPets - 1);
  };

  const data = [
    { label: "bedroom", value: noBedRoom },
    { label: "bathroom", value: noBathroom },
    { label: "guest", value: noGuest },
    { label: "pets", value: noPets },
  ];
  return (
    <div className="flex justify-center items-center h-full flex-col gap-5 overflow-auto no-scrollbar">
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
            className="flex flex-col sm:flex-row gap-5 justify-between w-full text-lg items-center"
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
