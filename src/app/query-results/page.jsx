"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/store";
import { getListing, getListingImages } from "@/lib/lisitng";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";

const QueryResultsPage = () => {
  const { queryResult } = useAppStore();
  const [detailedListings, setDetailedListings] = useState([]);
  const [isClient, setIsClient] = useState(false);
    const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchDetailsAndImages = async () => {
      const uniqueCodes = [
        ...new Set(queryResult?.data?.map((item) => item.farmHouseCode) || []),
      ];

      const listings = await Promise.all(
        uniqueCodes.map(async (code) => {
          const listingResponse = await getListing(code);
          const listingData = listingResponse?.data?.[0];

          return listingData ? listingData : null;
        })
      );

      const validResults = listings.filter(Boolean); // remove nulls
      console.log(validResults); // now this should be an array of cleaned listing objects
      setDetailedListings(validResults);
    };
    

    if (queryResult?.data?.length > 0) {
      fetchDetailsAndImages();
    }
  }, [queryResult]);

  if (!isClient) return null;

  if (!queryResult || queryResult?.data?.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">No results found.</div>
    );
  }

  return (
    <>
      <Navbar />
      {detailedListings.map((data, index) => {
        const amenities = data.aminities || [];
        const displayAmenities = amenities.slice(0, 3);
        const remainingCount = Math.max(0, amenities.length - 3);

        return (
          <div
            key={`${data.farmHouseCode}-${index}`}
            className="border p-4 rounded-lg shadow-lg bg-gray-50 flex flex-col justify-between hover:shadow-xl w-1/2 mx-auto mb-8 border-gray-200"
          >
            {/* Image */}
            <img
              src={data.farm_ImagePath1 || data.farm_ImagePath2 || 
                data.farm_ImagePath3 || data.farm_ImagePath4 || data.farm_ImagePath5 || data.farm_ImagePath6 || data.farm_ImagePath7 || data.farm_ImagePath8 || data.farm_ImagePath9 || data.farm_ImagePath10 ||
                "/home/default-placeholder.jpg"}
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
            <div className="flex justify-between items-center px-4 py-2">
              {/* Description */}
              <p className="text-sm text-gray-700 line-clamp-2 w-3/4">
                {data.farmDescription}
              </p>

              {/* Explore Button */}
              <button
                onClick={() => router.push(`/listing/${data.farmHouseCode}`)}
                className="bg-pastoral-theme-color text-white px-4 py-2 rounded hover:bg-opacity-90 transition whitespace-nowrap cursor-pointer hover:underline"
              >
                Explore
              </button>
            </div>

            {/* Landmark */}
            <p className="text-xs text-gray-700 italic mb-3 ml-4">
              {data.landMark}
            </p>

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
      })}
    </>
  );
};

export default QueryResultsPage;
