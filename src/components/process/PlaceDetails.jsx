import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import FormInput from "../common/FormInput";

const PlaceDetails = () => {
  const {
    address1,
    address2,
    address3,
    landMark,
    city,
    state,
    country,
    pinCode,
    setAddress1,
    setAddress2,
    setAddress3,
    setLandmark,
    setCity,
    setState,
    setCountry,
    setPincode,
  } = useAppStore();

  return (
    <div className="flex justify-center items-center h-full flex-col gap-2 w-full">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="font-semibold text-4xl">Confirm your address</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quod
          ex tempora, tenetur cumque provident.
        </p>
      </div>
      <div className="flex flex-col w-full items-center gap-3 h-full overflow-auto no-scrollbar pb-20 pt-5">
        <div className="flex flex-col gap-2 w-[30%]">
          <FormInput
            name="address1"
            placeholder="House, flat, bldg, etc."
            setValue={setAddress1}
            type="text"
            value={address1}
          />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <FormInput
            name="address2"
            placeholder="Area/village (if applicable)"
            setValue={setAddress2}
            type="text"
            value={address2}
          />{" "}
          <FormInput
            name="address3"
            placeholder="Street Address"
            setValue={setAddress3}
            type="text"
            value={address3}
          />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <FormInput
            name="landmark"
            placeholder="Nearby landmark (if applicable)"
            setValue={setLandmark}
            type="text"
            value={landMark}
          />{" "}
          <FormInput
            name="city"
            placeholder="City / town"
            setValue={setCity}
            type="text"
            value={city}
          />
          <FormInput
            name="state"
            placeholder="State"
            setValue={setState}
            type="text"
            value={state}
          />
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <FormInput
            name="pinCode"
            placeholder="PIN code"
            setValue={setPincode}
            type="text"
            value={pinCode}
          />{" "}
          <FormInput
            name="country"
            placeholder="Country / province"
            setValue={setCountry}
            type="text"
            value={country}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
