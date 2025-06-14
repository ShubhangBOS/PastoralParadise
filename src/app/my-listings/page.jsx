"use client";
import Footer from "@/components/footer/Footer";
import ListingCard from "@/components/ListingCard";
import Navbar from "@/components/navbar/Navbar";
import { useAppStore } from "@/store/store";
import { getAllListingImages } from "@/lib/lisitng";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { listings, setListings } = useAppStore();
  const [mergedListings, setMergedListings] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchImagesAndMerge = async () => {
      const images = await getAllListingImages({ farmHouseCode: "" });

      const imageMap = images.reduce((acc, img) => {
        const code = img.farmHouseCode.toUpperCase();
        if (!acc[code]) acc[code] = [];
        acc[code].push(img);
        return acc;
      }, {});

      const updatedListings = listings.map((listing) => {
        const code = listing.farmHouseCode.toUpperCase();
        const imagesForListing = imageMap[code] || [];
        return {
          ...listing,
          farm_ImagePath1: imagesForListing[0]?.imagePath || null,
          allImages: imagesForListing,
        };
      });

      setMergedListings(updatedListings);
    };

    if (listings?.length > 0) {
      fetchImagesAndMerge();
    } else {
      router.push("/");
    }
  }, [listings, router]);

  return (
    <div>
      <Navbar />
      {mergedListings?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-20 gap-10 py-10 justify-start items-start hide-scroll">
          {mergedListings.map((listing) => (
            <ListingCard
              data={listing}
              isMyListing
              key={listing.farmHouseCode}
              onDelete={(code) => {
                setMergedListings((prev) =>
                  prev.filter((item) => item.farmHouseCode !== code)
                );
                setListings(
                  listings.filter((item) => item.farmHouseCode !== code)
                );
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center p-6 mt-5">
          <h2 className="font-semibold text-2xl">You dont have any listings</h2>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default page;
