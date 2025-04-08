import React, { useEffect } from "react";
import { useAppStore } from "@/store/store";
import { AmenetiesType } from "@/data/Amenities";

const ListingAmenties = () => {
  const { currentListing } = useAppStore();
  function getSvgPathByName(name) {
    for (const amenity of AmenetiesType) {
      for (const data of amenity.data) {
        if (data.name === name) {
          return data.svgPath;
        }
      }
    }
    return null;
  }

  useEffect(() => {
    console.log("currentListing", currentListing.placeAmeneties);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xl font-semibold ">Amenties</h4>
      <ul className="grid grid-cols-5 gap-2">
        {currentListing?.placeAmeneties?.map((amenity) => (
          <li
            key={amenity}
            className="border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start"
          >
            {getSvgPathByName(amenity)}
            <span>{amenity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingAmenties;
