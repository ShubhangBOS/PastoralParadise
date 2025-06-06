"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import FormInput from "../common/FormInput";
import { useAppStore } from "@/store/store";
import { login, signup } from "@/lib/auth";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const { setAuthModal, setIsLoggedIn, setUserInfo, authMode } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const determineUserRole = () => {
    if (email === "admin") return "admin";
    if (isHost) return "host";
    if (isValidEmail(email)) return "user";
    return "";
  };

  const handleLogin = async () => {
    if (email && password) {
      const userRole = determineUserRole();

      if (!userRole) {
        alert("Please enter a valid email or select 'I am a host'");
        return;
      }

      const data = await login(email, password, userRole);

      if (data.status) {
        setUserInfo(data.data[0]);
        setIsLoggedIn(true);
        setAuthModal(false);
        sessionStorage.setItem("userInfo", JSON.stringify(data.data[0]));
        const userInfoString = sessionStorage.getItem("userInfo");

        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          console.log("User Info from sessionStorage:", userInfo);
        } else {
          console.log("No userInfo found in sessionStorage.");
        }

        sessionStorage.setItem("isLoggedIn", "true");
      } else {
        alert(data.returnMessage || "Login failed.");
      }
    }
  };

  const handleSignup = async () => {
    if (email && firstName && lastName && password) {
      const userRole = "Host" ? "admin" : "user";

      const data = await signup(
        email,
        firstName,
        lastName,
        password,
        userRole
      );
      if (data.status) {
        setUserInfo(data);
        setIsLoggedIn(true);
        setAuthModal(false);
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        const userInfoString = sessionStorage.getItem("userInfo");
        if(userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          console.log("User Info from session storage:",userInfo);
        } else {
          alert(data.returnMessage || "Login Failed")
        }
        sessionStorage.setItem("isLoggedIn", "true");
        router.push("/profilepage")
      }
    }
  };
  

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative w-full max-w-xl bg-gray-100 rounded-xl shadow-xl transition-all">
            {/* Header */}
            <div className="flex items-center justify-center border-b p-4 relative ">
              <span className="text-lg font-semibold">
                {authMode === "login" ? "Login" : "Sign Up"}
              </span>
              <button
                className="absolute right-4 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => setAuthModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                authMode === "login" ? handleLogin() : handleSignup();
              }}
              className="p-6 space-y-5"
            >
              <h3 className="text-xl font-medium text-center">
                Welcome to Pastoral Paradise
              </h3>

              {authMode === "signup" && (
                <>
                  <FormInput
                    name="firstName"
                    placeholder="First Name *"
                    values={firstName}
                    setValue={setFirstName}
                  />
                  <FormInput
                    name="lastName"
                    placeholder="Last Name"
                    values={lastName}
                    setValue={setLastName}
                  />
                </>
              )}
              {authMode === "signup" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">I am a</label>
                  <select
                    className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option value="User" className="font-medium text-sm">
                      User
                    </option>
                    <option value="Host" className="font-medium text-sm">
                      Host
                    </option>
                  </select>
                </div>
              )}

              <FormInput
                name="email"
                placeholder="Email *"
                values={email}
                setValue={setEmail}
              />

              <FormInput
                name="password"
                type="password"
                placeholder="Password *"
                values={password}
                setValue={setPassword}
              />

              <button
                type="submit"
                className="bg-pastoral-theme-color w-full py-3 text-white text-base font-semibold rounded-md hover:opacity-90 transition cursor-pointer"
              >
                {authMode === "login" ? "Login" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
