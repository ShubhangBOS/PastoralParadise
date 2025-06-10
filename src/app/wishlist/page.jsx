"use client";
import React, { useEffect, useState } from "react";
import {toast, Toaster} from "react-hot-toast";
import Navbar from "@/components/navbar/Navbar";
import { addToWishlistAPI, getListing } from "@/lib/lisitng";
import { useRouter } from "next/navigation";
import { BookmarkMinus } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [detailedListings, setDetailedListings] = useState([]);
  const [isRemoving, setIsRemoving] = useState(null);

  useEffect(() => {
    fetchWishlist();
  },[])

  const fetchWishlist = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const userId = userInfo?.userId;

    if (!userId) {
      toast.error("Login to Fetch Wishlist", { position: "top-right" });
      return;
    }

    const response = await addToWishlistAPI(" ", userId, "GET");

    if (
      response?.status === true &&
      response?.returnMessage === "Record Fetch Successfully."
    ) {
      const favouriteCodes =
        response.data?.map((item) => item.farmHouseCode) || [];

      if (favouriteCodes.length === 0) {
        toast("No Wishlist found.", { position: "top-right" });
        return;
      }

      fetchDetailsAndImages(favouriteCodes);
    } else {
      toast.error("Failed to Fetch Your Wishlist.", {
        position: "top-right",
      });
    }
  };

  const fetchDetailsAndImages = async (farmHouseCodes) => {
    const uniqueCodes = [...new Set(farmHouseCodes)];

    const listings = await Promise.all(
      uniqueCodes.map(async (code) => {
        const listingResponse = await getListing(code);
        return listingResponse?.data?.[0] || null;
      })
    );

    const validResults = listings.filter(Boolean); // remove nulls
    setDetailedListings(validResults);
  };

  const removeFromWishList = async(farmhouseCode) => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const userId = userInfo?.userId

    if (!userId){
      toast.error("Login to remove from wishlist")
    }

    setIsRemoving(farmhouseCode);

    try{
      const response = await addToWishlistAPI(farmhouseCode, userId, "DELETE");
      if(response?.status === true && response?.returnMessage === "Record Delete Successfully."){
        toast.success("Removed from Wishlist!")
        setDetailedListings((prev) => 
        prev.filter((item) => item.farmHouseCode !== farmhouseCode))
      } else {
        toast.error("Failed to Remove from Wishlist.")
      }
    } catch(error) {
      console.log("Error removing from wishlist",error);
    } finally {
      setIsRemoving(null)
    }
  }




  return (
    <>
      <Navbar />
      <Toaster />
      {detailedListings.length === 0 ? (
        <div className="text-center py-12">
          <BookmarkMinus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500">
            Start adding some farmhouses to your wishlist!
          </p>
        </div>
      ) : (
        detailedListings.map((data, index) => {
          const amenities = data.aminities || [];
          const displayAmenities = amenities.slice(0, 3);
          const remainingCount = Math.max(0, amenities.length - 3);
          const isCurrentlyRemoving = isRemoving === data.farmHouseCode;

          return (
            <div
              key={`${data.farmHouseCode}-${index}`}
              className={`border p-4 rounded-lg shadow-lg bg-gray-50 flex flex-col justify-between hover:shadow-xl w-1/2 mx-auto mb-8 border-gray-200 transition-opacity ${
                isCurrentlyRemoving ? "opacity-50" : ""
              }`}
            >
              {/* Image */}
              <img
                src={
                  data.farm_ImagePath1 ||
                  data.farm_ImagePath2 ||
                  data.farm_ImagePath3 ||
                  data.farm_ImagePath4 ||
                  data.farm_ImagePath5 ||
                  data.farm_ImagePath6 ||
                  data.farm_ImagePath7 ||
                  data.farm_ImagePath8 ||
                  data.farm_ImagePath9 ||
                  data.farm_ImagePath10 ||
                  "/home/default-placeholder.jpg"
                }
                alt={data.farmName}
                className="w-full h-40 object-cover rounded mb-2"
              />

              {/* Name */}
              <h3 className="font-bold text-lg mb-1">{data.farmName}</h3>

              {/* City + Price */}
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.5-7.5 10.5-7.5 10.5S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>
                    {data.city}, {data.state}
                  </span>
                </div>
                <span className="text-green-700 font-semibold text-xl">
                  ₹ {data.farmBookingPrice}
                </span>
              </div>

              {/* Description and Explore Button */}
              <div className="flex justify-between items-center px-4 py-2">
                <p className="text-sm text-gray-700 line-clamp-2 w-3/4">
                  {data.farmDescription}
                </p>
                <button
                  onClick={() => router.push(`/listing/${data.farmHouseCode}`)}
                  className="bg-pastoral-theme-color text-white px-4 py-2 rounded hover:bg-opacity-90 transition whitespace-nowrap cursor-pointer hover:underline"
                >
                  Explore
                </button>
              </div>

              <div className="flex justify-between items-center px-4 py-2">
                <p className="text-xs text-gray-700 italic mb-3 ml-4">
                  {data.landMark}
                </p>
                <button
                  className="bg-transparent text-gray-600 px-4 py-2 rounded hover:bg-red-100 hover:text-red-600 transition whitespace-nowrap cursor-pointer disabled:opacity-50"
                  onClick={() => removeFromWishList(data.farmHouseCode)}
                  disabled={isCurrentlyRemoving}
                >
                  {isCurrentlyRemoving ? (
                    <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                  ) : (
                    <BookmarkMinus />
                  )}
                </button>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {displayAmenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="text-lg px-2 py-1 bg-blue-100 text-blue-700 rounded-sm"
                  >
                    {amenity.aminitiesName}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    +{remainingCount} more
                  </span>
                )}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Page;
