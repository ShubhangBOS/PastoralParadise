"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Heart, MapPin } from "lucide-react";
import { useAppStore } from "@/store/store";
import { deleteListingAPI } from "@/lib/lisitng";
import { useEffect } from "react";

const ListingCard = ({
  data,
  isMyListing = false,
  isWishList = false,
  wishListId = undefined,
  onDelete = () => {},
}) => {
  const { wishLists, setWishLists } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();

  const addWishList = () => {
    alert("addWishlist");
    setWishLists([...wishLists, data]);
  };

  const removeWishlist = (wishListId) => {
    alert(wishListId);
    const currArr = wishLists.filter((item) => item.id !== wishListId);
    setWishLists(currArr);
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
      onClick={() => router.push(`/listing/${data.farmHouseCode}`)}
    >
      <div className="flex items-center justify-center cursor-pointer w-full">
        <div className="flex flex-col gap-2">
          <div className="relative w-64 h-56">
            <Image
              src={
                data?.farm_ImagePath1
                  ? `http://192.168.1.35:81${data.farm_ImagePath1}`
                  : "/home/defaultFarmImage.jpg"
              }
              fill
              alt="listings"
              className="rounded-lg object-cover hover:scale-105"
              placeholder="blur"
              blurDataURL="/home/defaultFarmImage.jpg"
              loading="lazy"
            />
            {/* {(pathname === "/" || pathname === "/wishlist") && (
              <div
                className="absolute right-2 top-2"
                onClick={(e) => {
                  e.stopPropagation();
                  if (wishLists?.some((item) => item.id === data.id)) {
                    console.log("data.id", data?.farmHouseCode);
                    removeWishlist(data?.farmHouseCode);
                  } else {
                    addWishList();
                  }
                }}
              >
                <Heart
                  // style={{ stroke: "white", strokeWidth: "40" }}
                  className={`text-3xl ${
                    wishLists?.some((item) => item.id === data.id)
                      ? "bg-pastoral-theme-color"
                      : "bg-[#00000099]"
                  }`}
                />
              </div>
            )} */}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pastoral-theme-color capitalize">
              {data?.farmName}
            </h3>
            <div className="flex flex-col items-left justify-start text-sm gap-1">
              <span className="font-bold text-gray-600">&#8377; {data?.farmBookingPrice}</span>
              <div className="flex items-left justify-start text-sm font-light gap-1">
              <MapPin className="w-4 h-4" />
              <span className="font-medium capitalize">{data?.state}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMyListing && (
        <button
          className="bg-pastoral-gradient py-3 mt-5 text-white text-base font-medium rounded-md cursor-pointer w-70"
          onClick={deleteListing}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ListingCard;
