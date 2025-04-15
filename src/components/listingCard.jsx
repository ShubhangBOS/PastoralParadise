"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";

const ListingCard = ({
  data,
  isMyListing = false,
  isWishList = false,
  wishListId = undefined,
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
    console.log(currArr);
    setWishLists(currArr);
  };

  const deleteListing = () => {};

  useEffect(() => {
    console.log("listingData", data);
  }, [data]);

  return (
    <div
      className="flex items-center justify-center flex-col gap-1"
      onClick={() => router.push(`/listing/${data.farmHouseCode}`)}
    >
      <div className="flex items-center justify-center cursor-pointer w-full">
        <div className="flex flex-col gap-2">
          <div className="relative w-64 h-56">
            <Image
              src={data?.farm_ImagePath1 || "/home/defaultFarmImage.jpg"}
              fill
              alt="listings"
              className="rounded-lg object-cover"
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
            <h3>{data?.farm_Name}</h3>
            <span>&#8377; {data?.farm_BookingPrice}</span>
          </div>
        </div>
      </div>
      {isMyListing && (
        <button
          className="bg-pastoral-gradient py-3 mt-5 text-white text-base font-medium rounded-md cursor-pointer w-80"
          onClick={deleteListing}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ListingCard;
