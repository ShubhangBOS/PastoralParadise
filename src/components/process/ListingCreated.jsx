"use client";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Confetti from "react-confetti";

const ListingCreated = () => {
  const router = useRouter();
  const {
    uesrInfo,
    locationType,
    placeType,
    mapData,
    locationData,
    placeSpace,
    placeAmeneties,
    photos,
    title,
    description,
    price,
  } = useAppStore();

  useEffect(() => {}, [
    uesrInfo,
    locationType,
    placeType,
    mapData,
    locationData,
    placeSpace,
    placeAmeneties,
    photos,
    title,
    description,
    price,
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
