import { useAppStore } from "@/store/store";
import Daimond from "@/svg/daimond";
import React, { useEffect, useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";

export default function TripScheduler() {
  const router = useRouter();

  const { currentListing, userInfo, setBookingDetails, checkInOutDates } =
    useAppStore();

  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    children: 1,
    infants: 0,
    pets: 0,
  });
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const toggleDropdown = () => setShowGuestDropdown(!showGuestDropdown);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const disabledRanges =
    checkInOutDates?.map((item) => ({
      startDate: new Date(item.checkInDateTime),
      endDate: new Date(item.checkOutDateTime),
    })) || [];

  const getAllDisabledDates = (ranges) => {
    const disabled = [];
    ranges.forEach(({ startDate, endDate }) => {
      let current = new Date(startDate);
      current.setHours(0, 0, 0, 0);
      const last = new Date(endDate);
      last.setHours(0, 0, 0, 0);
      while (current <= last) {
        disabled.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return disabled;
  };

  const disabledDates = getAllDisabledDates(disabledRanges);
  const totalGuests = guestCounts.adults + guestCounts.children;

  const calculateDaysDifference = () =>
    differenceInDays(selectionRange.endDate, selectionRange.startDate);

  const isRangeOverlapping = (start, end) => {
    return checkInOutDates.some(
      (range) =>
        new Date(start) < new Date(range.checkOutDateTime) &&
        new Date(end) > new Date(range.checkInDateTime)
    );
  };

  const handleGuestChange = (type, delta) => {
    setGuestCounts((prev) => {
      const updated = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      const total = updated.adults + updated.children;
      if (total > currentListing.noGuest) return prev;
      if (type === "pets" && updated.pets > currentListing.noPets) return prev;
      return updated;
    });
  };

  const handleReservation = () => {
    const { startDate, endDate } = selectionRange;

    if (isRangeOverlapping(startDate, endDate)) {
      alert(
        "Selected dates overlap with existing bookings. Please choose another range."
      );
      return;
    }

    const numberOfDays = calculateDaysDifference();

    // Later in your function:
    setBookingDetails({
      farmhouseCode: currentListing.farmHouseCode,
      checkinDatetime: startDate.toISOString(),
      checkoutDatetime: endDate.toISOString(),
      numberOfDays,
      numberofAdults: guestCounts.adults,
      numberofChildrens: guestCounts.children,
      numberofInfants: guestCounts.infants,
      numberofPets: guestCounts.pets,
      totalNumberofGuest: totalGuests,
    });
    

    router.push("/book");
  };

  return (
    <div className="sticky top-0 w-full flex flex-col gap-6 items-center justify-center">
      <div className="border border-gray-400 rounded-lg shadow-lg flex p-4 gap-2 items-start px-8 flex-col w-full mt-5">
        <div className="flex gap-1 text-lg">
          <span className="font-bold">
            &#8377;{currentListing?.farmBookingPrice}
          </span>
          <span>/ night</span>
        </div>

        <div className="w-full">
          <label className="font-semibold text-xs mb-2 block">
            Select Dates
          </label>
          <DateRange
            editableDateInputs={true}
            onChange={(ranges) => setSelectionRange(ranges.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[selectionRange]}
            minDate={new Date()}
            disabledDates={disabledDates}
            rangeColors={["#00a86b"]}
            className="w-full"
          />
        </div>

        {/* Guests Selector */}
        <div className="relative w-full">
          <div
            onClick={toggleDropdown}
            className="flex flex-col gap-1 border border-gray-300 p-2 rounded-md cursor-pointer"
          >
            
              <label className="font-semibold text-xs">GUESTS</label>
              
            
            {/*   
            <span className="flex items-center text-lg text-green-700 font-semibold">
            &#8377;{currentListing.farmBookingPrice * calculateDaysDifference()}
            <span className="relative w-20 h-20">
              <Image
                src="/PastoralParadiseIcon/PricesTag.svg"
                alt="Price Tag Icon"
                fill
              />
            </span>
          </span> 
          */}
            <span className="text-sm">
              {totalGuests} guest{totalGuests > 1 ? "s" : ""}{" "}
              {guestCounts.infants > 0
                ? `, ${guestCounts.infants} Infants`
                : ""}
              {guestCounts.pets > 0 ? ` & ${guestCounts.pets} Pets` : ""}
            </span>
          </div>

          {showGuestDropdown && (
            <div className="absolute z-10 bg-white border rounded-lg mt-2 w-full shadow-xl p-4 space-y-4">
              {[
                { label: "Adults", sub: "Age 13+", key: "adults" },
                { label: "Children", sub: "Ages 2–12", key: "children" },
                { label: "Infants", sub: "Under 2", key: "infants" },
                {
                  label: "Pets",
                  sub: (
                    <span>
                      Bringing a{" "}
                      <a href="#" className="underline">
                        service animal?
                      </a>
                    </span>
                  ),
                  key: "pets",
                },
              ].map(({ label, sub, key }) => (
                <div key={key} className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{label}</div>
                    <div className="text-xs text-gray-500">{sub}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleGuestChange(key, -1)}
                      className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-600 disabled:opacity-30"
                      disabled={guestCounts[key] === 0}
                    >
                      −
                    </button>
                    <span>{guestCounts[key]}</span>
                    <button
                      onClick={() => handleGuestChange(key, 1)}
                      className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-600 disabled:opacity-30"
                      disabled={
                        ((key === "adults" || key === "children") &&
                          guestCounts.adults + guestCounts.children >=
                            currentListing.noGuest) ||
                        (key === "pets" &&
                          guestCounts.pets >= currentListing.noPets)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 mt-2">
                This place has a maximum of {currentListing?.noGuest} guests,
                not including infants.
                {currentListing?.noPets === 0
                  ? " There are no pets allowed."
                  : ` If you're bringing more than ${currentListing?.noPets} pets, please let your Host know.`}
              </div>
              <div className="text-right">
                <button
                  onClick={() => setShowGuestDropdown(false)}
                  className="underline text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="bg-pastoral-gradient py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer w-full"
          onClick={handleReservation}
        >
          Reserve
        </button>

        <span className="text-center w-full mb-4 text-sm text-gray-600">
          You won't be charged yet
        </span>
        <div className="flex justify-between items-center w-full">
          <span className="text-md font-semibold">
            &#8377;{currentListing.farmBookingPrice} x{" "}
            {calculateDaysDifference()} nights
          </span>

          {/* Price with icon */}
          <span className="flex items-center text-lg text-green-700 font-semibold">
            &#8377;{currentListing.farmBookingPrice * calculateDaysDifference()}
            <span className="relative w-20 h-20">
              <Image
                src="/PastoralParadiseIcon/PricesTag.svg"
                alt="Price Tag Icon"
                fill
              />
            </span>
          </span>
        </div>

        {/* <div className="flex justify-between w-full">
          <span>Total before taxes</span>
          <span>
            &#8377;{currentListing.farmBookingPrice * calculateDaysDifference()}
          </span>
        </div> */}
      </div>

      <div className="flex gap-3 items-center cursor-pointer mb-5">
        <span className="underline font-semibold">Report this listing</span>
      </div>
    </div>
  );
}
