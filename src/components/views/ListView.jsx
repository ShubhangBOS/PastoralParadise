import { useAppStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { getAllListings } from "@/lib/lisitng";
import dynamic from "next/dynamic";
import { FixedSizeGrid as Grid } from "react-window";
import { url } from "@/lib/http";

const ListingCard = dynamic(() => import("../ListingCard"), { ssr: false });

const CARD_WIDTH = 300;
const CARD_HEIGHT = 360;

const ListView = () => {
  const { listings, setQueryResult } = useAppStore();
  const [mergedListings, setMergedListings] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: null, height: null });
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllListings();
      if (response?.data) {
        setMergedListings(response.data); // ✅ store listings locally
        setQueryResult({ data: response.data }); // ✅ optional: update global store if needed
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.max(1, Math.floor(width / CARD_WIDTH));
      setWindowSize({ width, height });
      setColumnCount(cols);
    };

    getData(); // ✅ call function

    if (typeof window !== "undefined") {
      handleResize(); // initial sizing
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const listing = mergedListings[index];
    if (!listing) return null;

    const imagePaths = [];
    for (let i = 1; i <= 10; i++) {
      const path = listing[`farm_ImagePath${i}`];
      if (path) imagePaths.push(`${url}${path}`);
    }

    return (
      <div style={style}>
        <ListingCard
          key={listing.farmHouseCode}
          data={listing}
          imagePaths={imagePaths}
        />
      </div>
    );
  };

  const rowCount = Math.ceil(mergedListings.length / columnCount);

  if (!windowSize.width || !windowSize.height) return null;

  return (
    <div className="px-10 py-10">
      <Grid
        columnCount={columnCount}
        columnWidth={CARD_WIDTH}
        height={windowSize.height - 100}
        rowCount={rowCount}
        rowHeight={CARD_HEIGHT}
        width={windowSize.width - 40}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default ListView;
