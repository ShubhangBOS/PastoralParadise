import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const ListingCard = dynamic(() => import("../listingCard"), { ssr: false });

const ListView = () => {
  const { listings } = useAppStore();
  useEffect(() => {
    console.log("listView", listings);
  }, [listings]);
  return (
    <div>
      {listings?.length > 0 ? (
        <div className="grid grid-cols-5 px-20 gap-10 py-10 justify-start items-start">
          {listings?.map((listing, index) => (
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
