"use client";
import Overview from "@/components/process/Overview";
import AirBnbLogoShort from "@/svg/airbnb-logo-short";
import React, { useState, useEffect } from "react";
import { useAppStore } from "@/store/store";
import Image from "next/image";
import StepOneStarter from "@/components/process/StepOneStarter";
import ListingTypeSelector from "@/components/process/ListingTypeSelector";
import ListingPlaceType from "@/components/process/ListingPlaceType";
import PlaceLocation from "@/components/process/PlaceLocation";
import PlaceDetails from "@/components/process/PlaceDetails";
import FloorPlan from "@/components/process/FloorPlan";
import StepTwoStarter from "@/components/process/StepTwoStarter";
import ProcessAmeneties from "@/components/process/ProcessAmeneties";
import Photos from "@/components/process/Photos";
import Title from "@/components/process/Title";
import Description from "@/components/process/Description";
import StepThreeStarter from "@/components/process/StepThreeStarter";
import Price from "@/components/process/Price";
import ListingCreated from "@/components/process/ListingCreated";
import { useRouter } from "next/navigation";

const page = () => {
  const { userInfo } = useAppStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const getComponent = () => {
    switch (step) {
      case 0:
        return <Overview />;
      case 1:
        return <StepOneStarter />;
      // case 2:
      //   return <ListingTypeSelector />;
      // case 2:
      //   return <ListingPlaceType />;
      // case 2:
      //   return <PlaceLocation />;
      case 2:
        return <PlaceDetails setIsValid={setIsLocationValid} />;
      case 3:
        return <FloorPlan />;
      case 4:
        return <StepTwoStarter />;
      case 5:
        return <ProcessAmeneties />;
      case 6:
        return <Title setIsValid={setIsTitleValid} />;
      case 7:
        return <Description setIsValid={setIsDescriptionValid} />;
      case 8:
        return <Price setIsValid={setIsPriceValid} />;
      case 9:
        return <StepThreeStarter />;
      case 10:
        return <Photos />;
      case 11:
        return <ListingCreated />;
      default:
        return <></>;
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    if (!isLocationValid) {
      alert("Please fill all required fields before proceeding.");
      return;
    }
    if (!isTitleValid) {
      alert("Please fill your place title");
      return;
    }
    if (!isDescriptionValid) {
      alert("Please fill your place description");
      return;
    }
    if (!isPriceValid) {
      alert("Price can not be zero");
      return;
    }
    setStep(step + 1);
  };

  useEffect(() => {
    if (userInfo?.emailid !== "admin") {
      router.push("/");
    }
  }, [userInfo, router]);

  return (
    <div className="grid grid-rows-new-listing min-h-screen">
      <header className="flex items-center px-5 md:px-10 lg:px-20 mt-5 justify-between">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image src="/home/logo.png" width={150} height={60} alt="logo" />
        </div>
        {step <= 13 && (
          <button className="border border-gray-300 px-5 py-2 rounded-full font-semibold hover:border-gray-700 cursor-pointer">
            save & exit
          </button>
        )}
      </header>
      {getComponent()}
      <footer
        className={`flex items-center px-5 md:px-10 lg:px-20 pb-4 border-t-4 border-t-gray-300 bg-white opacity-100 ${
          step > 0 ? "justify-between" : "justify-end"
        }`}
      >
        {step >= 1 && (
          <button
            className="py-3 mt-5 px-10 text-pastoral-light-black underline hover:bg-gray-200 text-base font-medium rounded-md cursor-pointer"
            onClick={handlePrevious}
          >
            Back
          </button>
        )}
        {step === 11 ? (
          <button
            className="bg-[#222222] py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer opacity-10"
            disabled
            onClick={handleNext}
          >
            Next
          </button>
        ) : step !== 0 ? (
          <button
            className="bg-[#222222] py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-pastoral-gradient py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={handleNext}
          >
            Get Started
          </button>
        )}
      </footer>
    </div>
  );
};

export default page;
