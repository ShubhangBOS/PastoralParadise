import { useAppStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { getAllListingImages } from "@/lib/lisitng";
import dynamic from "next/dynamic";
import { FixedSizeGrid as Grid } from "react-window";

const ListingCard = dynamic(() => import("../ListingCard"), { ssr: false });

const CARD_WIDTH = 300;
const CARD_HEIGHT = 360;

const ListView = () => {
  const { listings } = useAppStore();
  const [mergedListings, setMergedListings] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: null, height: null });
  const [columnCount, setColumnCount] = useState(1); // default to 1

  useEffect(() => {
    const fetchImagesAndMerge = async () => {
      const images = await getAllListingImages({ farmHouseCode: "" });

      const imageMap = new Map();
      images.forEach((img) => {
        const code = img.farmHouseCode.toUpperCase();
        if (!imageMap.has(code)) imageMap.set(code, []);
        imageMap.get(code).push(img);
      });

      const updatedListings = listings.map((listing) => {
        const code = listing.farmHouseCode.toUpperCase();
        const imagesForListing = imageMap.get(code) || [];
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

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.max(1, Math.floor(width / CARD_WIDTH));
      setWindowSize({ width, height });
      setColumnCount(cols);
    };

    if (typeof window !== "undefined") {
      handleResize(); // initial calculation
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [listings]);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const listing = mergedListings[index];

    if (!listing) return null;

    return (
      <div style={style}>
        <ListingCard key={listing.farmHouseCode} data={listing} />
      </div>
    );
  };

  const rowCount = Math.ceil(mergedListings.length / columnCount);

  if (!windowSize.height || !windowSize.width) return null;

  return (
    <div className="px-10 py-10">
      <Grid
        columnCount={columnCount}
        columnWidth={CARD_WIDTH}
        height={windowSize.height - 100}
        rowCount={rowCount}
        rowHeight={CARD_HEIGHT}
        width={windowSize.width - 40} // leave some padding
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default ListView;
