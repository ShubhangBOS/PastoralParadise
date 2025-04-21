import { useAppStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { getAllListingImages } from "@/lib/lisitng";
import dynamic from "next/dynamic";
const ListingCard = dynamic(() => import("../listingCard"), { ssr: false });

const ListView = () => {
  const { listings } = useAppStore();
  const [mergedListings, setMergedListings] = useState([]);

  useEffect(() => {
    const fetchImagesAndMerge = async () => {
      const images = await getAllListingImages({ farmHouseCode: "" });

      // Group images by farmHouseCode
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
    }
  }, [listings]);

  return (
    <div>
      {mergedListings?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 px-20 gap-10 py-10 justify-start items-start">
          {mergedListings.map((listing) => (
            <ListingCard key={listing.farmHouseCode} data={listing} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center p-6 mt-5">
          <h2 className="font-semibold text-2xl">
            There is no listing currently
          </h2>
        </div>
      )}
    </div>
  );
};

export default ListView;
