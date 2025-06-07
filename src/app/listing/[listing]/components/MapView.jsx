"use client";
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
    <div className="mt-4">
      <button
        onClick={handleOpenMap}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded shadow-md transition-all cursor-pointer"
      >
        View on Google Maps
      </button>
    </div>
  );
};
