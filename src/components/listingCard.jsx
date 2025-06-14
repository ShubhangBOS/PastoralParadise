"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Heart, PlusCircle, MapPin } from "lucide-react";
import { useAppStore } from "@/store/store";
import { addToWishlistAPI, deleteListingAPI, makeFavourite } from "@/lib/lisitng";
import { useState } from "react";
import {toast,Toaster} from 'react-hot-toast';
import Spinner from "./common/Spinner";

const ListingCard = ({
  data,
  imagePaths = [],
  isMyListing = false,
  isWishList = false,
  wishListId = undefined,
  onDelete = () => {},
}) => {
  const { wishLists, setWishLists } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();

  const [heartFilled, setHeartFilled] = useState(false);
  const [heartPlusFilled, setHeartPlusFilled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const addToWishlist = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const userId = userInfo?.userId;

    if (!userId) {
      toast.error("Login to Add to Wishlist");
      return;
    }

    const farmhouseCode = data?.farmHouseCode; // ✅ use 'data' here
    const response = await addToWishlistAPI(farmhouseCode, userId, "INS");

    if (
      response.status === true &&
      response.returnMessage === "Record Insert Successfully."
    ) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="p-4 w-full">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    ✅ Added to Wishlist
                  </p>
                </div>
                <div className="ml-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.dismiss(t.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click
                    toast.dismiss(t.id);
                    router.push("/wishlist"); // navigate to wishlist
                  }}
                  className="bg-none border-none text-green-700 px-3 py-1 text-sm rounded hover:underline cursor-pointer"
                >
                  Click Here to View Your Wishlist
                </button>
              </div>
            </div>
          </div>
        ),
        { position: "top-right", duration: 3000 }
      );
    } else {
      toast.error("Failed to Add to Wishlist.", { position: "top-right" });
    }
  };

  const addToFavourite = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const userId = userInfo?.userId;
    console.log(userId);

    if (!userId) {
      toast.error("Login to Add to Favourite");
      return;
    }

    const farmhouseCode = data?.farmHouseCode; // ✅ use 'data' here
    const response = await makeFavourite(farmhouseCode, userId, "INS");

    if (
      response.status === true &&
      response.returnMessage === "Record Insert Successfully."
    ) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="p-4 w-full">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    ✅ Added to Your Favourites
                  </p>
                </div>
                <div className="ml-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.dismiss(t.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click
                    toast.dismiss(t.id);
                    router.push("/favourite"); // navigate to wishlist
                  }}
                  className="bg-none border-none text-green-700 px-3 py-1 text-sm rounded hover:underline cursor-pointer"
                >
                  Click Here to See Your Favourites !
                </button>
              </div>
            </div>
          </div>
        ),
        { position: "top-right", duration: 3000 }
      );
    } else {
      toast.error("Failed to Add to Wishlist.", { position: "top-right" });
    }
  };

  const handleNavigation = () => {
    setIsNavigating(true); // 3. Show spinner
    router.push(`/listing/${data.farmHouseCode}`);
  };

  const deleteListing = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    const res = await deleteListingAPI({ farmHouseCode: data.farmHouseCode });
    if (res?.status) {
      onDelete(data.farmHouseCode);
    } else {
      alert("There is error deleting the listing, Please try after Sometime");
    }
  };

  return (
    <div
      className="flex items-center justify-center flex-col gap-1"
      onClick={handleNavigation}
    >
      {isNavigating ? (
        <div className="w-64 h-56 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex items-center justify-center cursor-pointer w-full">
          <div className="flex flex-col gap-2">
            <div className="relative w-64 h-56 overflow-x-visible whitespace-nowrap rounded-lg shadow-sm hover:shadow-xl">
              {imagePaths.length > 0 ? (
                imagePaths.map((src, index) => (
                  <div
                    key={index}
                    className="inline-block w-64 h-56 relative mr-2"
                  >
                    <Image
                      src={src}
                      fill
                      alt={`Listing image ${index + 1}`}
                      className="rounded-lg object-cover"
                      placeholder="blur"
                      blurDataURL="/home/defaultFarmImage.jpg"
                      loading="lazy"
                    />
                  </div>
                ))
              ) : (
                <div className="relative w-64 h-56">
                  <Image
                    src="/home/defaultFarmImage.jpg"
                    fill
                    alt="default"
                    className="rounded-lg object-cover"
                    placeholder="blur"
                    blurDataURL="/home/defaultFarmImage.jpg"
                  />
                </div>
              )}

              {/* Heart - Top Left */}
              <div
                className="absolute top-2 left-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setHeartFilled(!heartFilled);
                }}
              >
                <Heart
                  className={`w-6 h-6 hover:scale-105 ${
                    heartFilled ? "fill-red-400 text-red-400" : "text-black"
                  }`}
                  onClick={addToWishlist}
                />
              </div>

              {/* HeartPlus - Top Right */}
              <div
                className="absolute top-2 right-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setHeartPlusFilled(!heartPlusFilled);
                }}
              >
                <PlusCircle
                  className={`w-6 h-6 hover:scale-105 ${
                    heartPlusFilled ? "fill-red-400 text-black" : "text-black"
                  }`}
                  onClick={addToFavourite}
                />
              </div>
            </div>

            {/* Text Info */}
            <div>
              <h3 className="text-xl font-semibold text-pastoral-theme-color capitalize">
                {data?.farmName}
              </h3>
              <div className="flex flex-col items-left justify-start text-sm gap-1">
                <span className="font-bold text-gray-600">
                  &#8377; {data?.farmBookingPrice}
                </span>
                <div className="flex items-left justify-start text-sm font-light gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium capitalize">
                    {data?.city}, {data?.state}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" reverseOrder={false} />

      {isMyListing && (
        <button
          className="bg-pastoral-gradient py-3 mt-5 text-white text-base font-medium rounded-md cursor-pointer w-70"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ListingCard;
