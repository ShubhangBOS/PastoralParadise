"use client";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
import { useAppStore } from "@/store/store";
import React from "react";
import ListingPhotos from "./components/ListingPhotos";
import ListingAmenties from "./components/ListingAmenties";
import ListingMap from "./components/ListingMap";
import TripScheduler from "./components/TripScheduler";
import Footer from "@/components/footer/Footer";

const page = () => {
  const { currentListing, setCurrentListing } = useAppStore();
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
                <h2 className="text-5xl">{currentListing.title}</h2>
                <span className="text-lg cursor-pointer underline">
                  Chattarpur Mandir
                </span>
              </div>
              <ListingPhotos />
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold">
                    {currentListing?.locationType} hosted by{" "}
                    {currentListing?.listingCreatedBy?.firstName}{" "}
                    {currentListing?.listingCreatedBy?.lastName}
                  </h3>
                  <ul className="flex gap-5">
                    {Object.keys(currentListing.placeSpace).map((type) => (
                      <li
                        key={type}
                        className="border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start w-32"
                      >
                        <span className="text-2xl">
                          {currentListing.placeSpace[type]}
                        </span>
                        <span className="capitalize">{type}</span>
                      </li>
                    ))}
                  </ul>
                  <p>{currentListing.description}</p>
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
