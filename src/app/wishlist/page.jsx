"use client";
import AuthModal from "@/components/auth/AuthModal";
import ListingCard from "@/components/ListingCard";
import { useAppStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Page() {
  const { wishLists, setWishLists } = useAppStore();

  useEffect(() => {
    const getData = () => {
      setWishLists(wishLists);
    };
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-[82.5vh] flex justify-start items-start">
        {wishLists?.length > 0 ? (
          <div className="grid grid-cols-4 px-10 gap-3 py-10 h-[75vh] overflow-auto no-scrollbar w-full items-start">
            {wishLists?.map((listing, index) => (
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
