"use client";
import { Globe } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import ContextMenu from "../common/ContextMenu";
import { useAppStore } from "@/store/store";

const Navbar = () => {
  const { setAuthModal } = useAppStore();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  useEffect(() => {
    console.log("1234", typeof setAuthModal);
  });
  const contextMenuOptions = [
    {
      name: "Login",
      callBack: () => {
        setAuthModal();
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Signup",
      callBack: () => {
        setAuthModal();
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Add Your Property",
      callBack: () => {
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
  return (
    <header className="w-full flex flex-col justify-center transition-all duration-300 h-20 border-b border-b-gray-200">
      <div className="flex items-center justify-between px-20">
        <div className="flex-grow basis-0">
          <div className="w-max cursor-pointer">
            <Image src="/home/logo.png" width={150} height={60} alt="logo" />
          </div>
        </div>
        <div className="flex-grow basis-0">
          <ul className="flex items-center justify-end gap-6 font-medium">
            <li className="cursor-pointer">
              <span>Add Your Property</span>
            </li>
            <li className="cursor-pointer">
              <Globe />
            </li>
            <li
              className="flex cursor-pointer items-center gap-2 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
              onClick={() => setIsContextMenuVisible(!isContextMenuVisible)}
            >
              <Menu />
              <span>
                <Image
                  src="/home/empty-profile.png"
                  alt="profile"
                  width={30}
                  height={30}
                />
              </span>
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
            y: 70,
          }}
          options={contextMenuOptions}
        />
      )}
    </header>
  );
};

export default Navbar;
