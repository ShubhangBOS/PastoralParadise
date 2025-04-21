"use client";
import AuthModal from "@/components/auth/AuthModal";
import Footer from "@/components/footer/Footer";
import ListingBar from "@/components/listingbar/ListingBar";
import Navbar from "@/components/navbar/Navbar";
import ListView from "@/components/views/ListView";
import MapView from "@/components/views/MapView";
import ViewSwitchBadge from "@/components/views/ViewSwitchBadge";
import { listingTypes } from "@/data/listingTypes";
import { getAllListings } from "@/lib/lisitng";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const { isAuthModalOpen, setListings, isMapView } = useAppStore();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllListings();
      console.log("listings", data.data);
      setListings(data.data);
    };
    getData();
  }, [setListings]);
  return (
    <div className="max-h-[100vh] h-[100vh]">
      <Navbar />
      <ListingBar />
      {/* <div className="flex items-center justify-center">
        <div className="w-[90vw] overflow-auto no-scrollbar mt-3 px-5">
          <ul className="flex gap-5 h-full">
            {listingTypes.map((data) => (
              <li
                key={data.name}
                className="w-max flex flex-col items-center justify-between h-16 px-4 cursor-pointer"
              >
                <span className="h-10 w-10 flex items-center justify-center">
                  {data.svgPath}
                </span>
                <div
                  className="text-xs font-semibold break-keep"
                  style={{ width: "inherit" }}
                >
                  {data.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      {isMapView ? <MapView /> : <ListView />}
      {/* <ViewSwitchBadge /> */}
      <Footer />
      {isAuthModalOpen && <AuthModal />}
    </div>
  );
}
