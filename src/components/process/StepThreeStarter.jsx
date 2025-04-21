import React, { useEffect } from "react";
import { createLisitngAPI } from "@/lib/lisitng";
import { useAppStore } from "@/store/store";

const StepThreeStarter = () => {
  const { setCreateNewListing } = useAppStore();

  const {
    address1,
    address2,
    address3,
    landMark,
    city,
    state,
    country,
    pinCode,
    noBathroom,
    noBedRoom,
    noGuest,
    noAdults,
    noChildren,
    noInfants,
    noPets,
    // photos,
    farmName,
    farmDescription,
    farmBookingPrice,
    amenities,
    // farmStatus,
    taskType,
  } = useAppStore();

  useEffect(() => {
    const createListing = async () => {
      const response = await createLisitngAPI({
        address1,
        address2,
        address3,
        landMark,
        city,
        state,
        country,
        pinCode,
        noBathroom,
        noBedRoom,
        noGuest,
        noAdults,
        noChildren,
        noInfants,
        noPets,
        farmName,
        farmDescription,
        farmBookingPrice,
        amenities,
        taskType,
      });

      if (response.status) {
        console.log("createNewListing", response.data[0]);
        setCreateNewListing(response.data[0]);
      }
    };

    createListing();
  }, [
    address1,
    address2,
    address3,
    landMark,
    city,
    state,
    country,
    pinCode,
    noBathroom,
    noBedRoom,
    noGuest,
    noAdults,
    noChildren,
    noInfants,
    noPets,
    // photos,
    farmName,
    farmDescription,
    farmBookingPrice,
    amenities,
    // farmStatus,
    taskType,
  ]);
  return (
    <div className="flex items-center h-full mx-10 mt-10 md:mx-20 overflow-auto no-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-pastoral-light-black">
          <div className="text-2xl">Step 3</div>
          <h1 className="text-4xl">
            <strong>Finish up and publish</strong>
          </h1>
          <p className="text-xl">
            You almost their just upload some aesthetics photos of your
            wonderland and publish to see the response from the people around.
          </p>
        </div>
        <div>
          <video src="/home/home3.mp4" autoPlay loop></video>
        </div>
      </div>
    </div>
  );
};

export default StepThreeStarter;
