"use client";
import { Globe, Menu } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import SearchInput from "./Search";
import { url } from "@/lib/http";

const Navbar = () => {
  const router = useRouter();
  const { setAuthModal, userInfo, setUserInfo, setAuthMode } = useAppStore();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  // Load userInfo from sessionStorage on mount if not already in store
  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    if (!userInfo && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo(parsedUser);
      } catch (err) {
        console.error("Failed to parse userInfo from sessionStorage", err);
      }
    }
  }, [userInfo, setUserInfo]);

  // Default guest options
  const contextMenuOptions = [
    {
      name: "Login",
      callBack: () => {
        setAuthModal(true);
        setAuthMode("login");
        setIsContextMenuVisible(false);
      },
      imgSrc: "/PastoralParadiseIcon/Login.png",
    },
    {
      name: "Sign Up",
      callBack: () => {
        setAuthModal(true);
        setAuthMode("signup");
        setIsContextMenuVisible(false);
      },
      imgSrc: "/PastoralParadiseIcon/SignUp.png",
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
  ];



  const getAuthenticatedContextMenuOptions = () => {
    const userRole = userInfo?.userRole?.toLowerCase() || "";
    console.log("user role is :",userRole);

    const isUser = userRole === "user";
    const isHost = userRole === "admin"; 

    const common = [
      {
        name: "Messages",
        callBack: () => setIsContextMenuVisible(false),
      },
      {
        name: "Notifications",
        callBack: () => setIsContextMenuVisible(false),
      },
      {
        name: "Help",
        callBack: () => setIsContextMenuVisible(false),
      },
      {
        name: "Logout",
        callBack: () => {
          setUserInfo(null);
          setIsContextMenuVisible(false);
          sessionStorage.removeItem("userInfo");
          router.push("/");
        },
      },
    ];

    if (isUser) {
      return [
        ...common.slice(0, 2),
        {
          name: "Profile",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/profilepage");
          },
        },
        {
          name: "Wishlists",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/wishlist");
          },
        },
        {
          name: "Favourites",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/favourite");
          },
        },
        {
          name: "Trips",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/trips");
          },
        },
        ...common.slice(2),
      ];
    }

    if (isHost) {
      return [
        ...common.slice(0, 2),
        {
          name: "Add Your Property",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/new-listing");
          },
        },
        {
          name: "Profile",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/profilepage");
          },
        },
        {
          name: "All Bookings",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/bookings");
          },
        },
        {
          name: "Manage Listings",
          callBack: () => {
            setIsContextMenuVisible(false);
            router.push("/my-listings");
          },
        },
        ...common.slice(2),
      ];
    }

    // Fallback if userRole is unknown
    return [...common];
  };
  
  

  return (
    <header className="w-full transition-all duration-300 bg-gray-50 shadow-md mb-4">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 md:px-20 py-4 lg:w-full">
        <div className="flex items-center justify-between w-full lg:justify-center gap-4">
          {/* Logo */}
          <div
            className="cursor-pointer max-w-[180px] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[300px] xl:max-w-[400px]"
            onClick={() => router.push("/")}
          >
            <Image
              src="/home/logo.png"
              alt="logo"
              width={500}
              height={60}
              className="w-9/10 h-auto scale-60"
              priority
            />
          </div>

          {/* Search - shown on md+ */}
          <div className="hidden md:block w-full max-w-3xl px-4">
            <SearchInput />
          </div>

          {/* Context menu trigger */}
          <ul className="flex items-center gap-4">
            {(userInfo?.data?.[0]?.userId === "admin" ||
              userInfo?.data?.[0]?.userId.includes("FHO")) && (
              <li
                className="cursor-pointer hidden sm:block"
                onClick={() => router.push("/new-listing")}
              >
                <span>Add Your Property</span>
              </li>
            )}

            <li
              className="flex cursor-pointer items-center gap-2 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
              onClick={() => setIsContextMenuVisible(!isContextMenuVisible)}
            >
              <Menu className="text-2xl" />
              {userInfo?.profilePic ? (
                <Image
                  src={`${url}${userInfo.profilePic}`}
                  alt="Profile"
                  width={30}
                  height={30}
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="flex justify-center bg-black items-center text-white h-7 w-7 text-md rounded-full">
                  {userInfo?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Context Menu */}
      {isContextMenuVisible && (
        <ContextMenu
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
          coordinates={{
            x: window.innerWidth - 550,
            y: 65,
          }}
          options={
            userInfo ? getAuthenticatedContextMenuOptions() : contextMenuOptions
          }
        />
      )}
    </header>
  );
};

export default Navbar;
