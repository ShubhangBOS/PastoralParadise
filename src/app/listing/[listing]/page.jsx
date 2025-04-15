"use client";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import ListingPhotos from "./components/ListingPhotos";
import ListingAmenties from "./components/ListingAmenties";
import ListingMap from "./components/ListingMap";
import TripScheduler from "./components/TripScheduler";
import Footer from "@/components/footer/Footer";
import { getListing } from "@/lib/lisitng";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const { currentListing, setCurrentListing, userInfo } = useAppStore();
  useEffect(() => {
    const getCurrentListing = async () => {
      const data = await getListing(params.listing);
      console.log(data.data[0]);
      setCurrentListing(data.data[0]);
    };
    getCurrentListing();
  }, [params.listing]);

  const { no_Bathroom, no_BedRoom, no_Guest } = currentListing;
  const placeSpace = { no_Bathroom, no_BedRoom, no_Guest };

  return (
    <div>
      {currentListing && (
        <div>
          <Navbar />
          <div
            className="px-20 pt-10 text-pastoral-light-black grid gap-10"
            style={{ gridTemplateColumns: "70fr 30fr" }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-5xl">{currentListing.farm_Name}</h2>
                <span className="text-lg cursor-pointer underline">
                  {currentListing.city}, {currentListing.state}
                </span>
              </div>
              {/* <ListingPhotos /> */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold">
                    Farmhouse hosted by {userInfo?.firstName}{" "}
                    {userInfo?.lastName}
                  </h3>
                  <ul className="flex gap-5">
                    {Object.keys(placeSpace).map((type) => (
                      <li
                        key={type}
                        className="border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start w-32"
                      >
                        <span className="text-2xl">{placeSpace[type]}</span>
                        <span className="capitalize">{type.slice(3)}</span>
                      </li>
                    ))}
                  </ul>
                  <p>{currentListing.farm_Description}</p>
                  <ListingAmenties />
                  <ListingMap />
                </div>
              </div>
            </div>
            <div>
              <TripScheduler />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default page;
