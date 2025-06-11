"use client";
import AuthModal from "@/components/auth/AuthModal";
import Spinner from "@/components/common/Spinner";
import Footer from "@/components/footer/Footer";
import ListingBar from "@/components/listingbar/ListingBar";
import Navbar from "@/components/navbar/Navbar";
import ListView from "@/components/views/ListView";
import MapView from "@/components/views/MapView";
import ViewSwitchBadge from "@/components/views/ViewSwitchBadge";
import { listingTypes } from "@/data/listingTypes";
import { getAllListings } from "@/lib/lisitng";
import { useAppStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function Home() {
  const { authModal, setListings, isMapView } = useAppStore();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     // setLoading(true);
  //     const response = await getAllListings();
  //     console.log(response.data.farm_ImagePath1);
  //     if (response) {
  //       setListings(response.data);
  //       // setLoading(false);
  //     }
  //   };
  //   getData();
  // }, [setListings]);

  return (
    <div className="max-h-[100vh] h-[100vh] overflow-auto no-scrollbar bg-gray-50">
      <Navbar />
      {isMapView ? <MapView /> : <ListView />}
      {/* <ViewSwitchBadge /> */}
      <Footer />
      {authModal && <AuthModal />} {/* 🔥 Conditionally render modal */}
    </div>
  );
}
