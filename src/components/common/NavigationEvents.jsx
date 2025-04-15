"use client";
import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import { login } from "@/lib/auth";

const NavigationEvents = () => {
  const { userInfo, setUserInfo } = useAppStore();
  useEffect(() => {}, [userInfo]);
  return null;
};

export default NavigationEvents;
