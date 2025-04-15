import { useAppStore } from "@/store/store";
import React from "react";

const Price = () => {
  const { farm_BookingPrice, setFarmBookingPrice } =
    useAppStore();
  return (
    <div className="flex items-center justify-center h-full text-pastoral-light-black">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl">Now, set your price</h2>
          <p>Share what makes your place special</p>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="border border-gray-400 h-56 w-[550px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl"
            value={farm_BookingPrice}
            onChange={(e) => {
              if (e.target.value) {
                setFarmBookingPrice(parseInt(e.target.value));
              } else setFarmBookingPrice(0);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Price;
