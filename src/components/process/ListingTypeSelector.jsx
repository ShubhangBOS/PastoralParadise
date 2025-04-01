import { listingTypes } from "@/data/listingTypes";
import { useAppStore } from "@/store/store";
import React from "react";

const ListingTypeSelector = () => {
  const { locationType, setLocationType } = useAppStore();
  return (
    <div className="flex justify-center items-center max-h-[80vh] h-[80vh]">
      <div>
        <h2 className="font-semibold text-4xl">
          Which of these best describe your place?
        </h2>
        <div className="grid grid-cols-3 gap-5 max-h-[70vh] overflow-auto scroll no-scrollbar my-10 pb-5">
          {listingTypes.map((type) => (
            <button
              key={type.name}
              className={`flex flex-col font-semibold border border-gray-300 rounded-md p-3 hover:border-gray-950 transition-all duration-300 cursor-pointer ${
                type.name === locationType?.name &&
                "border-gray-950 bg-slate-100"
              }`}
              onClick={() => setLocationType(type)}
            >
              {type.svgPath}{" "}
              <span className="text-pastoral-light-black font-medium text-left">
                {type.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingTypeSelector;
