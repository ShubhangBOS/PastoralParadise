"use client";

import Navbar from '@/components/navbar/Navbar';
import { getListing, userWiseBookingDetails } from '@/lib/lisitng';
import React, { useEffect,useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
      const [detailedListings, setDetailedListings] = useState([]);

    useEffect(() => {
        getUserWiseBookingDetails();
    },[])

      const getUserWiseBookingDetails = async () => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        const userId = userInfo?.userId;

        const response = await userWiseBookingDetails(userId);

        if (
          response?.status === true &&
          response?.returnMessage === "Record Fatch Successfully."
        ) {
          const codes = response.data?.map((item) => item.farmHouseCode) || [];

          if (codes.length === 0) {
            toast.warning("No Bookings found for you.");
          }
          fetchDetailsAndImages(codes);
        } else {
          toast.error("Failed to Fetch Your Booking.");
        }
      };


    const fetchDetailsAndImages = async(farmHouseCodes) => {
        const uniqueCodes = [...new Set(farmHouseCodes)];

        const listings = await Promise.all(
            uniqueCodes.map(async (code) => {
                const listingResponse = await getListing(code);
                return listingResponse?.data?.[0] || null;
            })
        )

        const validResults = listings.filter(Boolean);
        setDetailedListings(validResults)
    }


  return (
    <>
    <Navbar/>
    <Toaster/>
    {detailedListings.length === 0 ? (
        <div className='text-center py-12'>
            <h3 className='text-lg font-lg text-gray-900 mb-2'> You have not booked anything yet!</h3>
        </div>
    ) : (
        detailedListings.map((data, index) => {
            return (
              <div
                key={`${data.farmHouseCode}-${index}`}
                className="border p-4 rounded-lg shadow-lg bg-gray-50 flex flex-col justify-between hover:shadow-xl w-1/2 mx-auto mb-8 border-gray-200 transition-opacity"
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
              </div>
            );
        })
    )}
    </>
  )
}

export default Page