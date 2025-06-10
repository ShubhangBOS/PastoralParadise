"use client";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar/Navbar";
import { makeFavourite } from "@/lib/lisitng";

const Page = () => {
  useEffect(() => {
    const fetchFavourites = async () => {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      const userId = userInfo?.data?.[0]?.userId;

      if (!userId) {
        toast.error("Login to Fetch Favourites", { position: "top-right" });
        return;
      }

      const response = await makeFavourite(" ", userId, "GET");

      if (
        response?.status === true &&
        response?.returnMessage === "Record Insert Successfully."
      ) {
        // Do something with response.data if needed
        console.log("Wishlist fetched:", response.data);
      } else {
        toast.error("Failed to Fetch Your Wishlist.", { 
          position: "top-right",
        });
      }
    };

    fetchFavourites();
  }, []);

  return <Navbar />;
};

export default Page;
