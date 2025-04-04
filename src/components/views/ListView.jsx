import { useAppStore } from "@/store/store";
import React from "react";
import dynamic from "next/dynamic";
const ListingCard = dynamic(() => import("../listingCard"), { ssr: false });

const ListView = () => {
  const { listings } = useAppStore();
  return (
    <div className="grid grid-cols-5 px-20 gap-10 py-10 justify-start items-start">
      {listings.length &&
        listings.map((listing, index) => (
          <ListingCard key={index} data={listing} />
        ))}
      {listings.length &&
        listings.map((listing, index) => (
          <ListingCard key={index} data={listing} />
        ))}
    </div>
  );
};

export default ListView;
