import { useAppStore } from "@/store/store";
import Daimond from "@/svg/daimond";
import React, { useState } from "react";
// import { BsFillFlagFill } from "react-icons/bs";
import { addDays } from "date-fns";
import { addTrip } from "@/lib/lisitng";
import { useRouter } from "next/navigation";

export default function TripScheduler() {
  const router = useRouter();
  const { currentListing, userInfo } = useAppStore();
  const [state, setState] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: addDays(new Date(), 7).toISOString().slice(0, 10),
  });

  const calculateDaysDifference = () => {
    const startDate = new Date(state.startDate);
    const endDate = new Date(state.endDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  const handleReservation = async () => {
    if (userInfo) {
      const data = {
        listingId: currentListing.farmHouseCode,
        userId: userInfo?.emailid,
        tripData: {
          startDate: state.startDate,
          endDate: state.endDate,
          price: `$${
            currentListing.farmBookingPrice * calculateDaysDifference()
          }`,
        },
      };
      const response = await addTrip(data);
      if (response) {
        router.push("/trips");
      }
    }
  };

  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    children: 1,
    infants: 0,
    pets: 0,
  });

  const toggleDropdown = () => setShowGuestDropdown(!showGuestDropdown);

  const handleGuestChange = (type, delta) => {
    setGuestCounts((prev) => {
      const updated = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      const total = updated.adults + updated.children;

      if (total > currentListing.noGuest) return prev;
      if (type === "pets" && updated.pets > currentListing.noPets) return prev;

      return updated;
    });
  };

  const totalGuests = guestCounts.adults + guestCounts.children;

  return (
    <div className="sticky top-0 w-full flex flex-col gap-6 items-center justify-center">
      <div className="border border-gray-400 rounded-lg shadow-lg flex p-4 gap-2 items-start px-8 flex-col w-full mt-5">
        <div className="flex gap-1 text-lg">
          <span className="font-bold">
            &#8377;{currentListing.farmBookingPrice}
          </span>
          <span>night</span>
        </div>

        {/* Date Pickers */}
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tl-md cursor-pointer">
              <label className="font-semibold text-xs">CHECK-IN</label>
              <input
                type="date"
                className="text-sm accent-pastoral-theme-color"
                value={state.startDate}
                name="startDate"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const newStart = e.target.value;
                  setState((prev) => ({
                    ...prev,
                    startDate: newStart,
                    endDate:
                      new Date(prev.endDate) < new Date(newStart)
                        ? newStart
                        : prev.endDate,
                  }));
                }}
              />
            </div>
            <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tr-md cursor-pointer">
              <label className="font-semibold text-xs">CHECK-OUT</label>
              <input
                type="date"
                className="text-sm accent-pastoral-theme-color"
                value={state.endDate}
                name="endDate"
                min={state.startDate}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex flex-col gap-1 border border-gray-300 p-2 rounded-b-md cursor-pointer"
            >
              <label className="font-semibold text-xs">GUESTS</label>
              <span className="text-sm">
                {totalGuests} guest{totalGuests > 1 ? "s" : ""}
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
                    ? "There are no pets allowed"
                    : `If you're bringing more than ${currentListing?.noPets} pets, please let your Host
                  know.`}
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
        </div>

        <button
          className="bg-pastoral-gradient py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer w-full"
          onClick={handleReservation}
        >
          Reserve
        </button>

        <span className="text-center w-full">You won't be charged yet</span>
        <div className="flex justify-between w-full">
          <span>
            &#8377;{currentListing.farmBookingPrice} x{" "}
            {calculateDaysDifference()} nights
          </span>
          <span>
            &#8377;
            {currentListing.farmBookingPrice * calculateDaysDifference()}
          </span>
        </div>
        <div className="flex justify-between w-full">
          <span>Total before taxes</span>
          <span>
            &#8377;
            {currentListing.farmBookingPrice * calculateDaysDifference()}
          </span>
        </div>
      </div>

      {/* Rare find */}
      <div className="flex border border-gray-400 rounded-lg p-4 gap-2 items-start px-8">
        <span>
          <strong>This is a rare find. </strong>
          {userInfo?.firstName}'s place on Pastoral is usually fully booked.
        </span>
        <Daimond />
      </div>

      {/* Report section */}
      <div className="flex gap-3 items-center cursor-pointer mb-5">
        <span>{/* <BsFillFlagFill /> */}</span>
        <span className="underline font-semibold">Report this listing</span>
      </div>
    </div>
  );
}
