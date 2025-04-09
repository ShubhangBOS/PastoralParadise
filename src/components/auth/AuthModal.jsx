"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import FormInput from "../common/FormInput";
import { useAppStore } from "@/store/store";
import { login, signup } from "@/lib/auth";

const AuthModal = () => {
  const { setAuthModal, setIsLoggedIn, setUserInfo, authMode } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      const data = await login(email, password);

      if (data.status) {
        setUserInfo(data.data[0]);
        setIsLoggedIn(true);
        setAuthModal();
        localStorage.setItem("userInfo", JSON.stringify(data.data[0]));
        localStorage.setItem("isLoggedIn", "true");
      }
    }
  };

  const handleSignup = async () => {
    if (email && firstName && lastName && password) {
      const data = await signup(email, firstName, lastName, password);
      console.log("1234", data);
      if (data.status) {
        setUserInfo(data);
        setIsLoggedIn(true);
        setAuthModal();
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "true");
      }
    }
  };

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white pb-4 pt-5">
              <div className="border-b border-b-gray-200 flex items-center justify-center relative pb-5">
                <span
                  className="absolute left-5 cursor-pointer text-lg"
                  onClick={setAuthModal}
                >
                  <X />
                </span>
                <span>{authMode === "login" ? "Login" : "Sign Up"}</span>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  authMode === "login" ? handleLogin() : handleSignup();
                }}
              >
                <div className="p-5">
                  <h3 className="text-xl pb-5">Welcome to Pastoral Paradise</h3>
                  <div className="flex flex-col gap-5">
                    <FormInput
                      name="email"
                      placeholder="Email"
                      values={email}
                      setValue={setEmail}
                    />
                    {authMode === "signup" && (
                      <>
                        <FormInput
                          name="firstName"
                          placeholder="First Name"
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
                    <FormInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      values={password}
                      setValue={setPassword}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-pastoral-theme-color py-3 mt-5 w-full text-white text-lg font-medium rounded-md cursor-pointer"
                  >
                    {authMode === "login" ? "Login" : "Sign Up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
