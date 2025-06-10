"use client";

import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ListingCard from "@/components/ListingCard";
import { addToWishlistAPI } from "@/lib/lisitng";
import { useAppStore } from "@/store/store";

export default function Page() {
  const { wishLists, setWishLists } = useAppStore();

  useEffect(() => {
    const fetchWishList = async () => {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      const userId = userInfo?.data?.[0]?.userId;

      if (!userId) {
        toast.error("Login to Fetch Favourites", { position: "top-right" });
        return;
      }

      const response = await addToWishlistAPI(" ", userId, "GET");

      if (
        response?.status === true &&
        response?.returnMessage === "Record Fetch Successfully."
      ) {
        console.log("Wishlist fetched:", response.data);
        setWishLists(response.data); // ✅ update Zustand store
      } else {
        toast.error("Failed to Fetch Your Wishlist.", {
          position: "top-right",
        });
      }
    };

    fetchWishList();
  }, [setWishLists]);

  return (
    <div>
      <Navbar />
      <div className="h-[82.5vh] flex justify-start items-start">
        {wishLists && wishLists.length > 0 ? (
          <div className="grid grid-cols-4 px-10 gap-3 py-10 h-[75vh] overflow-auto no-scrollbar w-full items-start">
            {wishLists.map((listing, index) => (
              <ListingCard
                data={listing}
                key={index}
                isWishList
                wishListId={listing.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h1>No Wishlists for current user. Add new Wishlists.</h1>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
