"use client";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/footer/Footer";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { getTripsAPI } from "@/lib/lisitng";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});

export default function Page() {
  const [tripData, setTripData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [farmhouseCode, setFarmhouseCode] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const calendarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getTripListings = async () => {
      const startDate = dateRange[0]?.startDate;
      const endDate = dateRange[0]?.endDate;

      const filters = {
        farmhouseCode:
          farmhouseCode?.trim() !== "" ? farmhouseCode.trim() : null,
        bookingStatus: statusFilter?.trim() !== "" ? statusFilter.trim() : null,
        fromDate: startDate ? formatDateToDMY(startDate) : null,
        toDate: endDate ? formatDateToDMY(endDate) : null,
      };

      const data = await getTripsAPI(filters);
      console.log("trips data", data.data);
      setTripData(data.data);
    };

    getTripListings();
  }, [farmhouseCode, statusFilter, dateRange[0].endDate]);

  const formatDateToDMY = (dateInput) => {
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSaveChanges = async () => {
    try {
      const res = await updateBookingAPI(selectedBooking);
      if (res.success) {
        toast.success("Booking updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end mb-6">
          <div className="w-full lg:w-1/4">
            <input
              type="text"
              placeholder="Farmhouse Code"
              value={farmhouseCode}
              onChange={(e) => setFarmhouseCode(e.target.value)}
              className="px-4 py-2 border rounded-md w-full"
            />
          </div>

          <div className="w-full lg:w-1/4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md w-full"
            >
              <option value="">All Status</option>
              <option value="booked">Booked</option>
              <option value="pending">Pending</option>
              <option value="reject">Rejected</option>
            </select>
          </div>

          <div className="w-full lg:w-1/4 relative">
            <label className="font-semibold">Filter by Check-In Date:</label>
            <input
              type="text"
              readOnly
              onClick={() => setShowCalendar(true)}
              value={
                dateRange[0]?.startDate && dateRange[0]?.endDate
                  ? `${new Date(
                      dateRange[0].startDate
                    ).toLocaleDateString()} - ${new Date(
                      dateRange[0].endDate
                    ).toLocaleDateString()}`
                  : ""
              }
              placeholder="Select Date Range"
              className="mt-2 px-4 py-2 border rounded-md w-full cursor-pointer bg-white"
            />

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute z-10 mt-2 bg-white shadow-lg"
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDateRange([item.selection]);
                    // setShowCalendar(false);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  className="shadow-lg"
                />
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
                  onClick={() => {
                    setDateRange([
                      {
                        startDate: null,
                        endDate: null,
                        key: "selection",
                      },
                    ]);
                  }}
                >
                  Clear Dates
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="text-xs text-gray-100 bg-gray-800 uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Booking ID</th>
                <th className="px-6 py-3 text-left">Listing</th>
                <th className="px-6 py-3 text-left">Check-In</th>
                <th className="px-6 py-3 text-left">Check-Out</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tripData?.length ? (
                tripData?.map((trip, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{trip.bookingId}</td>
                    <td className="px-6 py-4">{trip.farmhouseName}</td>
                    <td className="px-6 py-4">
                      {formatDateToDMY(trip.checkinDatetime)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDateToDMY(trip.checkoutDatetime)}
                    </td>
                    <td className="px-6 py-4">₹{trip.totalBookingPrice}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-white px-2 py-1 rounded text-xs font-semibold ${
                          trip.isbookingConfirm === "BOOKED"
                            ? "bg-green-600"
                            : trip.isbookingConfirm === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {trip.isbookingConfirm}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedBooking(trip);
                          setShowModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No bookings found for your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Booking Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* Booking ID */}
              <div>
                <label className="block font-medium">Booking ID</label>
                <p className="text-gray-700">{selectedBooking.bookingId}</p>
              </div>

              {/* Farmhouse Name */}
              <div>
                <label className="block font-medium">Farmhouse Name</label>
                <p className="text-gray-700">{selectedBooking.farmhouseName}</p>
              </div>

              {/* Name */}
              <div>
                <label className="block font-medium">Customer Name</label>
                <input
                  type="text"
                  value={selectedBooking.name}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium">Customer Phone</label>
                <input
                  type="text"
                  value={selectedBooking.mobileNumber}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium">Customer Email</label>
                <input
                  type="text"
                  value={selectedBooking.emailID}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block font-medium">Price (₹)</label>
                <input
                  type="number"
                  value={selectedBooking.totalBookingPrice}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      totalBookingPrice: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Adults */}
              <div>
                <label className="block font-medium">Adults</label>
                <input
                  type="text"
                  value={selectedBooking.numberofAdults}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      numberofAdults: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Children */}
              <div>
                <label className="block font-medium">Children</label>
                <input
                  type="text"
                  value={selectedBooking.numberofChildrens}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      numberofChildrens: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Infants */}
              <div>
                <label className="block font-medium">Infants</label>
                <input
                  type="text"
                  value={selectedBooking.numberofInfants}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      numberofInfants: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Pets */}
              <div>
                <label className="block font-medium">Pets</label>
                <input
                  type="text"
                  value={selectedBooking.numberofPets}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      numberofPets: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Check-in */}
              <div>
                <label className="block font-medium">Check In</label>
                <input
                  type="date"
                  value={selectedBooking.checkinDatetime?.slice(0, 10)}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      checkinDatetime: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="block font-medium">Check Out</label>
                <input
                  type="date"
                  value={selectedBooking.checkoutDatetime?.slice(0, 10)}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      checkoutDatetime: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block font-medium">Status</label>
                <select
                  value={selectedBooking.isbookingConfirm}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedBooking((prev) => ({
                      ...prev,
                      isbookingConfirm: e.target.value,
                    }))
                  }
                  className={`mt-1 border px-3 py-2 rounded w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="PENDING">Pending</option>
                  <option value="BOOKED">Booked</option>
                  <option value="REJECT">Rejected</option>
                </select>
              </div>

              {isEditing && selectedBooking.isbookingConfirm === "REJECT" && (
                <div className="md:col-span-2">
                  <label className="block font-medium">Rejection Remarks</label>
                  <textarea
                    value={selectedBooking.remarks || ""}
                    onChange={(e) =>
                      setSelectedBooking((prev) => ({
                        ...prev,
                        remarks: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Enter reason for rejection"
                    className="mt-1 border px-3 py-2 rounded w-full"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {!isEditing ? (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    setIsEditing(true);
                    setOriginalBooking(selectedBooking);
                  }}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    onClick={handleSaveChanges}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedBooking(originalBooking);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
