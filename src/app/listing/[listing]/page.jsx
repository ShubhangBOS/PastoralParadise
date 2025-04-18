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
import { getListing, getAllListingImages } from "@/lib/lisitng";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const { currentListing, setCurrentListing, userInfo, setImageListings } =
    useAppStore();
  const farmHouseCode = params.listing;
  useEffect(() => {
    const getCurrentListing = async () => {
      const data = await getListing(params.listing);
      console.log(data.data[0]);
      setCurrentListing(data.data[0]);
    };

    const getListingImages = async () => {
      const data = await getAllListingImages({ farmHouseCode });
      setImageListings(data);
    };

    if (params.listing) {
      getCurrentListing();
      getListingImages();
    }
  }, [params.listing, setCurrentListing]);

  if (!currentListing) {
    return (
      <div className="text-center py-20">
        <p>Loading farmhouse details...</p>
      </div>
    );
  }

  const { noBathroom, noBedRoom, noGuest } = currentListing;
  const placeSpace = { noBathroom, noBedRoom, noGuest };

  return (
    <div>
      {currentListing && (
        <div>
          <Navbar />
          <div className="px-4 sm:px-8 md:px-12 lg:px-20 pt-8 sm:pt-10 text-pastoral-light-black grid gap-8 lg:gap-10 lg:grid-cols-[2fr_1fr]">
            {/* Main Content */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold break-words">
                  {currentListing.farmName}
                </h2>
                <span className="text-base sm:text-lg cursor-pointer underline">
                  {currentListing.city}, {currentListing.state}
                </span>
              </div>

              <ListingPhotos />

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Farmhouse hosted by {userInfo?.firstName}{" "}
                    {userInfo?.lastName}
                  </h3>

                  {/* Space Info */}
                  <ul className="flex flex-wrap gap-4">
                    {Object.keys(placeSpace).map((type) => (
                      <li
                        key={type}
                        className="border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start w-28 sm:w-32"
                      >
                        <span className="text-xl sm:text-2xl">
                          {placeSpace[type]}
                        </span>
                        <span className="capitalize text-sm">
                          {type.slice(2)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm sm:text-base leading-relaxed">
                    {currentListing.farmDescription}
                  </p>

                  <ListingAmenties />
                  {/* <ListingMap /> */}
                </div>
              </div>
            </div>

            <div className="mt-0">
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
