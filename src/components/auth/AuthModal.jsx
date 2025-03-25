"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import FormInput from "../common/FormInput";
import { useAppStore } from "@/store/store";

const AuthModal = () => {
  const { setAuthModal } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userFound, setUserFound] = useState(null);

  const verifyEmail = async () => {};

  const handleLogin = async () => {};

  const handleSignup = async () => {};
  return (
    <div className="relative z-50 ">
      <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white pb-4 pt-5">
                <div className="border-b border-b-gray-200 flex items-center justify-center relative pb-5">
                  <span
                    className="absolute left-5 cursor-pointer text-lg"
                    onClick={setAuthModal}
                  >
                    <X />
                  </span>
                  <span>login or signup</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl pb-5">Welcome to Pastoral Paradise</h3>
                  {userFound === null && (
                    <FormInput
                      name="email"
                      placeholder="Email"
                      values={email}
                      setvalue={setEmail}
                    />
                  )}
                  {userFound === true && (
                    <FormInput
                      name="password"
                      placeholder="Password"
                      values={password}
                      setvalue={setPassword}
                    />
                  )}
                  {userFound === false && (
                    <div className="flex gap-3 flex-col">
                      <FormInput
                        name="firstName"
                        placeholder="First Name"
                        values={firstName}
                        setvalue={setFirstName}
                      />
                      <FormInput
                        name="lastName"
                        placeholder="Last Name"
                        values={lastName}
                        setvalue={setLastName}
                      />
                      <FormInput
                        name="password"
                        placeholder="Password"
                        type="password"
                        values={password}
                        setvalue={setPassword}
                      />
                    </div>
                  )}
                  <button
                    className="bg-pastoral-theme-color py-3 mt-5 w-full text-white text-lg font-medium rounded-md"
                    onClick={
                      userFound === null
                        ? verifyEmail
                        : userFound
                        ? handleLogin
                        : handleSignup
                    }
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
