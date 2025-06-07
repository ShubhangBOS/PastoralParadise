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
    <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center justify-center p-4 bg-gray-50 rounded-xl w-full max-w-7xl mx-auto text-sm">
      <input
        type="text"
        value={farmhouseTitle}
        onChange={(e) => setFarmhouseTitle(e.target.value)}
        placeholder="Farmhouse Title"
        className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded-md outline-none focus:border-gray-400 text-black"
      />

      <DatePicker
        selected={checkInDate}
        onChange={(date) => {
          setCheckInDate(date);
          if (checkOutDate && date && checkOutDate < date) {
            setCheckOutDate(null);
          }
        }}
        placeholderText="Check-in"
        minDate={new Date()}
        className="min-w-[120px] flex-1 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-400 text-black"
      />

      <DatePicker
        selected={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        placeholderText="Check-out"
        minDate={checkInDate || new Date()}
        className="min-w-[120px] flex-1 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-400 text-black"
      />

      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        className="min-w-[100px] flex-1 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-400 text-black"
      />

      <button
        className="bg-pastoral-theme-color text-white px-3 py-2 rounded-md hover:opacity-90 transition min-w-[80px]"
        onClick={searchQuery}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
