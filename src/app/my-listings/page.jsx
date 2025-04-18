"use client";
import Footer from "@/components/footer/Footer";
import ListingCard from "@/components/ListingCard";
import Navbar from "@/components/navbar/Navbar";
import { useAppStore } from "@/store/store";
import React from "react";

const page = () => {
  const { listings } = useAppStore();
  return (
    <div>
      <Navbar />
      <div className="flex justify-start items-start">
        <div className="grid grid-cols-4 px-10 gap-3 py-10 w-full items-start">
          {listings.map((listing, index) => (
            <ListingCard
              data={listing}
              isMyListing
              key={listing.farmHouseCode}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
