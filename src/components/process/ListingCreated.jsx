"use client";
import { createLisitngAPI } from "@/lib/lisitng";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Confetti from "react-confetti";

const ListingCreated = () => {
  const router = useRouter();
  const {
    address1,
    address2,
    address3,
    landMark,
    city,
    state,
    country,
    pinCode,
    no_Bathroom,
    no_BedRoom,
    no_Guest,
    farm_Name,
    farm_Description,
    farm_BookingPrice,
    amenitie,
    farmHouseCode,
    task,
    columnName,
    updateValues,
  } = useAppStore();

  useEffect(() => {
    createLisitngAPI({
      address1,
      address2,
      address3,
      landMark,
      city,
      state,
      country,
      pinCode,
      no_Bathroom,
      no_BedRoom,
      no_Guest,
      farm_Name,
      farm_Description,
      farm_BookingPrice,
      amenitie,
      farmHouseCode,
      task: "i",
      columnName,
      updateValues,
      listingCreatedBy: { id: uesrInfo?.id },
    });
  }, [
    uesrInfo,
    address1,
    address2,
    address3,
    landMark,
    city,
    state,
    country,
    pinCode,
    no_Bathroom,
    no_BedRoom,
    no_Guest,
    farm_Name,
    farm_Description,
    farm_BookingPrice,
    amenitie,
    farmHouseCode,
    task,
    columnName,
    updateValues,
  ]);
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="font-semibold text-4xl">Congratulations!</h2>
        <p>You have successfully created your listing</p>
        <div className="flex gap-5">
          <button
            className="bg-[#222222] py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={() => router.push("/")}
          >
            Visit Home Page
          </button>
          <button
            className="bg-pastoral-gradient py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={() => router.push("/my-listings")}
          >
            View your listings
          </button>
        </div>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
};

export default ListingCreated;
