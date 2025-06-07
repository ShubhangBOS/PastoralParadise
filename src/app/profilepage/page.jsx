"use client";
import Navbar from "@/components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { url } from "@/lib/http";
import { updateUserProfile } from "@/lib/lisitng";
import toast, { Toaster } from "react-hot-toast";
import {useRouter} from 'next/navigation';

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
    firstName: "",
    lastName: "",
    emailid: "",
    password: "",
    userRole: "",
    profilePic: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const route = useRouter();

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
    ParmanentAddress: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    profilePic: null,
    sameAddress: false,
  });

  const [filteredStates, setFilteredStates] = useState(indianStates);

  // Handle loading data from session
  useEffect(() => {
    const stored = sessionStorage.getItem("userInfo");
    if (stored) {
      const user = JSON.parse(stored);
      setUserData(user);
      if (user.profilePic) {
        setImagePreview(`${url}${user.profilePic}`);
      }
    }
  }, []);

  // Keep permanentAddress in sync if checkbox is checked
  useEffect(() => {
    if (form.sameAddress) {
      setForm((prev) => ({
        ...prev,
        ParmanentAddress: prev.currentAddress,
      }));
    }
  }, [form.sameAddress, form.currentAddress]);

  // Universal input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Checkbox logic
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked,
        ParmanentAddress: checked ? prev.currentAddress : "",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If user is typing state, update suggestions
    if (name === "state") {
      const filtered = indianStates.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setForm((prev) => ({
        ...prev,
        profilePic: file,
      }));
    }
  };

  const UpdateUserDetails = async (e) => {
    e.preventDefault(); // Prevent page reload

    const {
      gender,
      mobile,
      dob,
      phone,
      fax,
      about,
      currentAddress,
      ParmanentAddress,
      city,
      district,
      state,
      pincode,
      profilePic,
    } = form;


    // Validate required fields
    if (
      !gender ||
      !mobile ||
      !dob ||
      !currentAddress ||
      !ParmanentAddress ||
      !city ||
      !district ||
      !state ||
      !pincode ||
      !profilePic
    ) {
      alert("Please fill all required fields.");
      return;
    }
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const userId = userInfo?.userId;
    

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("Gender", gender);
    formData.append("MobileNo", mobile);
    formData.append("Dob", dob);
    formData.append("Phoneno", phone); 
    formData.append("Faxno", fax);
    formData.append("About", about);
    formData.append("CurrentAddress", currentAddress);
    formData.append("ParmanentAddress", ParmanentAddress);
    formData.append("City", city);
    formData.append("District", district);
    formData.append("State", state);
    formData.append("PinCode", pincode);
    formData.append("Image", profilePic);

    try {
      const response = await updateUserProfile(formData);

      if (response.status) {
        sessionStorage.setItem("userInfo", JSON.stringify(response.data[0]));
        toast.success("Profile updated successfully!");
        setTimeout( () => {
          route.push('/')
        },2000)
      } else {
        alert(response.returnMessage || "Profile update failed.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating the profile.");
    }
  };
  

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-bl from-amber-500 to-[#ffffff] rounded-2xl shadow-md">
        <div className="flex justify-center items-center">
          <h2 className="text-amber-700 font-semibold mb-6 text-3xl">
            Update Profile
          </h2>
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={UpdateUserDetails}
          encType="multipart/form-data"
        >
          {/* Profile Pic Upload */}
          <div className="flex flex-col items-center space-y-4 justify-center w-full">
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

          {/* Basic Fields */}
          <input
            name="firstName"
            placeholder="First Name"
            value={userData.firstName}
            readOnly
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none max-h-12 mt-28"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={userData.lastName}
            readOnly
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.emailid}
            readOnly
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
          />

          {/* Other form inputs */}
          <select
            name="gender"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.gender}
            required
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
            value={form.dob}
            required
          />
          <input
            name="mobile"
            placeholder="Mobile No."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.mobile}
            maxLength={10}
            required
          />
          <input
            name="phone"
            placeholder="Phone No."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.phone}
            maxLength={12}
          />
          <input
            name="fax"
            placeholder="Fax No."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.fax}
          />
          <textarea
            name="about"
            placeholder="Tell Us About Yourself"
            className="border border-gray-300 rounded px-4 py-2 w-full col-span-2 focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.about}
            maxLength={500}
          />
          <input
            name="currentAddress"
            placeholder="Current Address"
            className="border border-gray-300 rounded px-4 py-2 w-full col-span-2 focus:border-amber-700 outline-none"
            required
            onChange={handleChange}
            value={form.currentAddress}
          />

          {/* Checkbox logic */}
          <div className="flex items-center col-span-2 space-x-2">
            <input
              type="checkbox"
              name="sameAddress"
              checked={form.sameAddress}
              onChange={handleChange}
            />
            <label htmlFor="sameAddress" className="text-sm text-gray-700">
              Same as current address
            </label>
          </div>

          <input
            name="ParmanentAddress"
            placeholder="Permanent Address"
            className="border border-gray-300 rounded px-4 py-2 w-full col-span-2 focus:border-amber-700 outline-none"
            value={form.ParmanentAddress}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.city}
            required
          />
          <input
            name="district"
            placeholder="District"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            onChange={handleChange}
            value={form.district}
            required
          />

          <input
            name="country"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:border-amber-700 outline-none"
            value="India"
            readOnly
          />

          <select
            name="state"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:border-amber-700 outline-none"
            value={form.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {filteredStates.map((state) => (
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
            value={form.pincode}
            required
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
