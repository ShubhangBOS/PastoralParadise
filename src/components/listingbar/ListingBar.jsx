"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listingTypes } from "@/data/listingTypes";

export default function ListingBar() {
  const listRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const scrollAmount = 7 * 80; // Adjust based on item width

  useEffect(() => {
    const checkScroll = () => {
      if (listRef.current) {
        setShowLeft(listRef.current.scrollLeft > 0);
        setShowRight(
          listRef.current.scrollLeft + listRef.current.clientWidth <
            listRef.current.scrollWidth
        );
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const scrollList = (direction) => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center w-[90vw] mt-5">
        {showLeft && (
          <button
            className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md"
            onClick={() => scrollList(-1)}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div
          className="w-[90%] overflow-x-auto no-scrollbar relative"
          ref={listRef}
        >
          <div
            className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-white to-transparent pointer-events-none"
            style={{ display: showLeft ? "block" : "none" }}
          ></div>
          <div
            className="absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent pointer-events-none"
            style={{ display: showRight ? "block" : "none" }}
          ></div>
          <ul className="flex gap-5 h-full whitespace-nowrap">
            {listingTypes &&
              listingTypes.map((data) => (
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
        {showRight && (
          <button
            className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md"
            onClick={() => scrollList(1)}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
