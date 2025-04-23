"use client";
import Image from "next/image";
import { useAppStore } from "@/store/store";
import FormInput from "@/components/common/FormInput";
import { useEffect, useState } from "react";
import { createBookingAPI } from "@/lib/lisitng";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/common/SuccessModal";

const BookPage = () => {
  const { bookingDetails, currentListing, setBookingDetails } = useAppStore();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const days = bookingDetails.numberOfDays || 1;
  const pricePerNight = currentListing?.farmBookingPrice || 0;
  const subtotal = pricePerNight * days;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  const router = useRouter();

  useEffect(() => {
    if (!bookingDetails || !currentListing) {
      router.back(); 
    }
  }, [bookingDetails, currentListing, router]);

  const handleContinue = async () => {
    const currentBookingDetails = useAppStore.getState().bookingDetails;

    const updatedBookingDetails = {
      ...currentBookingDetails,
      emailID: email,
      name: fullName,
      mobileNumber: phoneNumber,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      totalBookingPrice: total,
      taxAmount: taxes,
    };

    useAppStore.getState().setBookingDetails(updatedBookingDetails);

    const bookingData = await createBookingAPI(updatedBookingDetails);

    if (bookingData?.status === true) {
      setShowSuccessModal(true);
      localStorage.setItem("bookingCompleted", "true");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-2xl font-semibold">Request to book</h1>
        <hr className="w-full border border-gray-300" />
        <div className=" rounded-lg p-4 space-y-2">
          <h2 className="font-medium text-lg">Your trip</h2>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">Dates</p>
              <p className="text-sm text-gray-600">
                {bookingDetails?.checkinDatetime.slice(0, 10)} to{" "}
                {bookingDetails?.checkoutDatetime.slice(0, 10)}
              </p>
            </div>
            <button className="text-sm font-semibold text-pastoral-theme-color">
              Edit
            </button>
          </div>
          <div className="flex justify-between mt-2">
            <div>
              <p className="text-sm font-medium">Guests</p>
              <p className="text-sm text-gray-600">
                {bookingDetails?.totalNumberofGuest || 1} guest
              </p>
            </div>
            <button className="text-sm font-semibold text-pastoral-theme-color">
              Edit
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <hr className="w-full border border-gray-300" />
          <h2 className="text-lg font-medium">Fill up the details to book</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div className="flex flex-col gap-5">
              <FormInput
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                setValue={setEmail}
                required
              />

              <FormInput
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                setValue={setFullName}
                required
              />

              <FormInput
                name="phoneNumber"
                placeholder="Enter 10 digit Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
                required
              />

              <FormInput
                name="address"
                placeholder="Your Address"
                value={address}
                setValue={setAddress}
                required
              />

              <FormInput
                name="city"
                placeholder="City"
                value={city}
                setValue={setCity}
                required
              />

              <FormInput
                name="state"
                placeholder="State"
                value={state}
                setValue={setState}
                required
              />

              <FormInput
                name="pincode"
                placeholder="Pincode"
                value={pincode}
                setValue={setPincode}
                required
              />
            </div>

            <div className="space-y-2 mt-5">
              <p className="text-xs text-gray-500">
                We’ll call or text you to confirm your number. Standard message
                and data rates apply.
              </p>
              <button
                type="submit"
                className="w-full bg-pastoral-theme-color text-white font-semibold py-3 rounded cursor-pointer"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Price Summary */}
      <div className="border rounded-lg p-4 shadow-md max-h-100">
        <div className="text-sm text-gray-700 space-y-1">
          <p className="text-2xl">
            <strong>{currentListing?.farmName}</strong>
          </p>
          <p>
            <strong>Location:</strong> {currentListing?.address1},{" "}
            {currentListing?.address2}, {currentListing?.address3}
          </p>
          <p>
            <strong>City:</strong> {currentListing?.city},{" "}
            {currentListing?.state} - {currentListing?.pinCode}
          </p>
          <p>
            <strong>Landmark:</strong> {currentListing?.landMark}
          </p>
        </div>

        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <p>
              ₹{pricePerNight} x {days} night{days > 1 ? "s" : ""}
            </p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Taxes</p>
            <p>₹{taxes}</p>
          </div>
          <div className="flex justify-between text-base font-semibold border-t pt-2 mt-2">
            <p>Total (INR)</p>
            <p>₹{total}</p>
          </div>
          <a href="#" className="text-sm text-gray-600 underline">
            Price breakdown
          </a>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default BookPage;
