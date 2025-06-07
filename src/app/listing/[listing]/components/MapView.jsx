"use client";
import { MapPin } from "lucide-react";
import React from "react";

export const MapView = ({
  address1,
  address2,
  address3,
  city,
  state,
  country,
  pinCode,
}) => {
  const fullAddress = encodeURIComponent(
    `${address1}, ${address2}, ${address3}, ${city}, ${state}, ${country}, ${pinCode}`
  );

  const handleOpenMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${fullAddress}`;
    window.open(mapUrl, "_blank"); // opens in a new tab
  };

  return (
    <div
      className="bg-pastoral-gradient py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer w-full flex items-center justify-center"
      onClick={handleOpenMap}
    >
      <button className="mr-2">View on Google Maps</button>
      <MapPin />
    </div>
  );
};
