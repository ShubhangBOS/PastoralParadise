import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchQueryAPI } from "@/lib/lisitng";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [farmhouseTitle, setFarmhouseTitle] = useState("");
  const [state, setState] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const router = useRouter();
  const { setQueryResult } = useAppStore();

  const searchQuery = async () => {
    try {
      const response = await searchQueryAPI(
        state.trim() !== "" ? state : null,
        farmhouseTitle.trim() !== "" ? farmhouseTitle : null,
        checkInDate ? checkInDate.toISOString() : null,
        checkOutDate ? checkOutDate.toISOString() : null
      );

      setQueryResult(response);
      router.push("/query-results");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-gray-50 rounded-xl w-full max-w-7xl mx-auto">
      {/* Farmhouse Title */}
      <input
        type="text"
        value={farmhouseTitle}
        onChange={(e) => setFarmhouseTitle(e.target.value)}
        placeholder="Farmhouse Title"
        className="flex-1 min-w-[180px] p-2 border border-gray-300 rounded-md text-md outline-none focus:border-gray-400 transition text-black"
      />

      {/* Check-in */}
      <DatePicker
        selected={checkInDate}
        onChange={(date) => {
          setCheckInDate(date);
          if (checkOutDate && date && checkOutDate < date) {
            setCheckOutDate(null);
          }
        }}
        placeholderText="Check-in Date"
        minDate={new Date()}
        className="p-2 border border-gray-300 rounded-md text-md outline-none focus:border-gray-400 transition w-full text-black"
      />

      {/* Check-out */}
      <DatePicker
        selected={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        placeholderText="Check-out Date"
        minDate={checkInDate || new Date()}
        className="p-2 border border-gray-300 rounded-md text-md outline-none focus:border-gray-400 transition w-full text-black"
      />

      {/* State */}
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        className="p-2 border border-gray-300 rounded-md text-md outline-none focus:border-gray-400 transition text-black"
      />

      {/* Search Button */}
      <button
        className="bg-pastoral-theme-color text-white border p-2 rounded-lg text-sm hover:opacity-90 transition cursor-pointer"
        onClick={searchQuery}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
