"use client";
import { Globe } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import ContextMenu from "../common/ContextMenu";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import SearchInput from "./Search";
import { url } from "@/lib/http";

const Navbar = () => {
  const router = useRouter();
  const { setAuthModal, userInfo, setUserInfo, setAuthMode } =
    useAppStore();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  // useEffect(() => {
  //   restoreAuth();
  // }, []);

  const contextMenuOptions = [
    {
      name: "Login",
      callBack: () => {
        setAuthModal(true); // You can enhance this to pass mode too
        setAuthMode("login");
        // localStorage.setItem("authMode", "login");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Sign Up",
      callBack: () => {
        setAuthModal(true);
        setAuthMode("signup");
        // localStorage.setItem("authMode", "signup");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
  ];

  const authenticatedContextMenuOptions = [
    {
      name: "Messages",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Notifications",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Add Your Property",
      callBack: () => {
        setIsContextMenuVisible(false);
        router.push("/new-listing");
      },
    },
    {
      name: "Update Profile",
      callBack: () => {
        setIsContextMenuVisible(false);
        router.push("/profilepage");
      },
    },
    {
      name: "Trips",
      callBack: () => {
        setIsContextMenuVisible(false);
        router.push("/trips");
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
      name: "Manage Listings",
      callBack: () => {
        setIsContextMenuVisible(false);
        router.push("/my-listings");
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Logout",
      callBack: () => {
        setUserInfo(null);
        setIsContextMenuVisible(false);
        sessionStorage.clear();
      },
    },
  ];
  
  return (
    <header className="w-full flex flex-col justify-center transition-all duration-300 h-20  mb-4 bg-gray-50 shadow-md">
      <div className="flex items-center justify-between px-5 md:px-20">
        <div className="flex-grow basis-0">
          <div
            className="w-max cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src="/home/logo.png" width={150} height={60} alt="logo" />
          </div>
        </div>
        <SearchInput />
        <div className="flex-grow basis-0">
          <ul className="flex items-center justify-end gap-6 font-medium">
            {userInfo?.emailid === "admin" && (
              <li
                className="cursor-pointer hidden sm:block"
                onClick={() => router.push("/new-listing")}
              >
                <span>Add Your Property</span>
              </li>
            )}
            {/* <li className="cursor-pointer">
              <Globe />
            </li> */}
            <li
              className="flex cursor-pointer items-center gap-2 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
              onClick={() => setIsContextMenuVisible(!isContextMenuVisible)}
            >
              <Menu />
              {userInfo?.profilePic ? (
                <span>
                  <Image
                    src={`${url}${userInfo.profilePic}`}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                </span>
              ) : (
                <span className="flex justify-center bg-black items-center text-white h-7 w-7 text-sm rounded-full">
                  {userInfo?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
          coordinates={{
            x: window.innerWidth - 250,
            y: 55,
          }}
          options={
            userInfo ? authenticatedContextMenuOptions : contextMenuOptions
          }
        />
      )}
    </header>
  );
};

export default Navbar;
