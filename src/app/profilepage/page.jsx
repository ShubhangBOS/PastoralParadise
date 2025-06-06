"use client";
import Navbar from "@/components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";


const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chattisgarh",
  "Chandigarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];


const genders = ["Male", "Female", "Prefer Not To Say"];

export const Profile = () => {
  const [userData, setUserData] = useState({
    firstName : "",
    lastName : "",
    emailid : "",
    password : "",
    userRole : ""
  })
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userRole: "",
    gender: "",
    dob: "",
    mobile: "",
    phone: "",
    fax: "",
    about: "",
    currentAddress: "",
    permanentAddress: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    profilePic: null,
    sameAddress: false,
  });

  const [filteredStates, setFilteredStates] = useState(indianStates);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (form.sameAddress) {
      setForm((prev) => ({
        ...prev,
        permanentAddress: prev.currentAddress,
      }));
    }
  }, [form.sameAddress, form.currentAddress]);

  useEffect(() => {
    const stored = sessionStorage.getItem("userInfo");
    if (stored) {
      const user = JSON.parse(stored);
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        emailid: user.emailid,
        password: user.password,
        userRole: user.userRole,
      });
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      state: value,
    }));

    const filtered = indianStates.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStates(filtered);
    setShowSuggestions(true);
  };

  const userInfoString = sessionStorage.getItem("userInfo");
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    console.log("User Info from session storage:", userInfo);
  } else {
    alert(data.returnMessage || "Login Failed");
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-2xl shadow-md">
        <div className="flex justify-center items-center">
          <h2 className="text-amber-700 font-semibold mb-6 text-3xl">
            Update Profile
          </h2>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center space-y-4">
            {/* Image Circle */}
            <label
              htmlFor="profilePic"
              className="cursor-pointer relative w-32 h-32 rounded-full border-2 border-dashed border-amber-500 flex items-center justify-center overflow-hidden"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
              {/* Hidden file input */}
              <input
                id="profilePic"
                type="file"
                name="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <p className="text-sm text-gray-500">
              Click the circle to upload your profile picture
            </p>
          </div>
          <input
            name="firstName"
            placeholder="First Name"
            value={userData.firstName}
            readOnly
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none h-auto max-h-12 bg-gray-100"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={userData.lastName}
            readOnly
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none bg-gray-100"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            readOnly
            placeholder="Email"
            value={userData.emailid}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none bg-gray-100"
            onChange={handleChange}
          />
          {/* <input
            type="password"
            name="password"
            value={userData.password}
            readOnly
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
          /> */}
          {/* <input
            name="userRole"
            value={userData.userRole}
            readOnly
            placeholder="User Role"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
          /> */}
          <select
            name="gender"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.gender}
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <input
            type="date"
            name="dob"
            placeholder="DOB"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            required
          />
          <input
            name="mobile"
            placeholder="Mobile No."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone No."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
          />
          <input
            name="fax"
            placeholder="Fax No."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
          />
          <textarea
            name="about"
            placeholder="Tell Us About Yourself"
            className="border border-gray-300 rounded px-4 py-2 w-full col-span-2 focus:border-amber-700 outline-none"
            onChange={handleChange}
            required
          />
          <input
            name="currentAddress"
            placeholder="Current Address"
            className="border border-gray-300 rounded px-4 py-2 w-full col-span-2 focus:border-amber-700 outline-none"
            required
            onChange={handleChange}
          />

          <div className="flex items-center col-span-2 space-x-2">
            <input
              type="checkbox"
              name="sameAddress"
              checked={form.sameAddress}
              onChange={handleChange}
            />
            <label htmlFor="sameAddress focus:border-amber-700 outline-none">
              Same as current address
            </label>
          </div>

          <input
            name="permanentAddress"
            placeholder="Permanent Address"
            className="border border-gray-300 rounded px-4 py-2 w-full col-span-2 focus:border-amber-700 outline-none"
            value={form.permanentAddress}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
          />
          <input
            name="district"
            placeholder="District"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
          />

          {/* <label className="block mb-2 text-sm font-medium text-gray-700">
            Country
          </label> */}
          <input
            name="country"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            value="India"
          />

          <select
            name="state"
            className="w-full mb-4 border border-gray-300 rounded px-4 py-2 focus:border-amber-700 outline-none"
            value={form.state}
            onChange={handleChange}
          >
            <option
              value=""
              className="text-xs font-light bg-gray-50 hover:bg-gray-100"
            >
              Select State
            </option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <input
            name="pincode"
            placeholder="Pin Code"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="col-span-2 mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};


export default Profile;
