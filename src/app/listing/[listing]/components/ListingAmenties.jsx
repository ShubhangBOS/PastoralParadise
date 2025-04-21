import React, { useEffect } from "react";
import { useAppStore } from "@/store/store";
import { AmenetiesType } from "@/data/Amenities";

const ListingAmenties = () => {
  const { currentListing } = useAppStore();

  // Flatten AmenetiesType into a single map for easier lookup by id
  const amenitiesMap = AmenetiesType.flatMap((group) => group.data).reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {}
  );

  const availableAmenities = Object.entries(currentListing?.aminities[0] || {})
    .filter(([_, value]) => value)
    .map(([key]) => amenitiesMap[key])
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-2 mb-2">
      <h4 className="text-xl font-semibold">Amenities</h4>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {availableAmenities.map((amenity) => (
          <li
            key={amenity.id}
            className="border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start"
          >
            {amenity.svgPath}
            <span>{amenity.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingAmenties;
