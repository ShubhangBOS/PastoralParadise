"use client";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
import { useAppStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import ListingPhotos from "./components/ListingPhotos";
import ListingAmenties from "./components/ListingAmenties";
// import ListingMap from "./components/ListingMap";
import TripScheduler from "./components/TripScheduler";
import Footer from "@/components/footer/Footer";
import {toast,Toaster} from 'react-hot-toast';
import {
  getListing,
  getAllListingImages,
  getCheckInCheckouts,
  getReviews,
} from "@/lib/lisitng";
import { useParams } from "next/navigation";
import { MapView } from "./components/MapView";

const page = () => {
  const params = useParams();
  const {
    currentListing,
    setCurrentListing,
    userInfo,
    setImageListings,
    setCheckInOutDates,
  } = useAppStore();
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (!params.listing) return;

      const listingData = await getListing(params.listing);
      const current = listingData.data[0];
      
      setCurrentListing(current);

      const imageData = await getAllListingImages({
        farmHouseCode: params.listing,
      });
      setImageListings(imageData);

      const checkInOutData = await getCheckInCheckouts(params.listing);
      setCheckInOutDates(checkInOutData?.data || []);
    };

    fetchData();
  }, [params.listing, setCurrentListing]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!currentListing?.farmHouseCode) return;

      try {
        const response = await getReviews(
          currentListing.farmHouseCode,
          "", // userid not required for GET
          "", // fullName
          "", // mobileNo
          "", // emailid
          "", // comment
          "", // overallRating
          "", // cleanlinessRating
          "", // accuracyRating
          "", // checkinRating
          "", // communicationRating
          "", // locationRating
          "", // valueRating
          "", // reviewrImagepath
          "GET"
        );

        if (response?.status) {
         
          setReviews(response.data); 
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [currentListing?.farmHouseCode]);

  

  if (!currentListing) {
    return (
      <div className="text-center py-20">
        <p>Loading farmhouse details...</p>
      </div>
    );
  } else {
    const farmhouseOwnerUserId = currentListing.ownerUserid;
    sessionStorage.setItem("farmhouseOwnerUserId", farmhouseOwnerUserId);
    console.log(farmhouseOwnerUserId); // This is the value you just stored
  }

  const { noBathroom, noBedRoom, noGuest } = currentListing;
  const placeSpace = { noBathroom, noBedRoom, noGuest };

  return (
    <div>
      {currentListing && (
        <div>
          
          <Navbar />
          <div className="px-4 sm:px-8 md:px-12 lg:px-20 mx-0 2xl:mx-40 pt-8 sm:pt-10 text-pastoral-light-black grid gap-8 lg:gap-10 lg:grid-cols-[2fr_1fr]">
            {/* Main Content */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold break-words mb-2">
                  {currentListing?.farmName}
                </h2>
                <p className="text-lg">
                  {currentListing?.city} {currentListing?.pinCode},{" "}
                  <span className="text-gray-700 italic">{currentListing?.landMark}</span>
                  
                  <br />
                  <span className=" font-semibold">
                    {currentListing?.state}
                  </span>
                </p>
              </div>

              <ListingPhotos />

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-600">
                    Farmhouse hosted by{" "}
                    {currentListing?.farmHouseOwnerName || "Owner"}
                  </h3>
                  <h4></h4>

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

                  {/* <hr className="w-full border border-gray-300 my-8" /> */}

                  <p className="text-sm sm:text-base leading-relaxed text-gray-400">
                    {currentListing?.farmDescription}
                  </p>

                  <div>
                    <MapView
                      address1={currentListing.address1}
                      address2={currentListing.address2}
                      address3={currentListing.address3}
                      city={currentListing.city}
                      state={currentListing.state}
                      country={currentListing.country}
                      pinCode={currentListing.pinCode}
                    />
                  </div>

                  <hr className="w-full border border-gray-300 my-8" />

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
