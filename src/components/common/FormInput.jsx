import React from "react";

const FormInput = ({
  name,
  type = "text",
  value,
  setValue,
  placeholder,
  isListing = false,
  required = false,
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (name === "phoneNumber") {
      if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
        isListing ? setValue(name, inputValue) : setValue(inputValue);
      }
    } else {
      isListing ? setValue(name, inputValue) : setValue(inputValue);
    }
  };
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={handleInputChange}
      className="border border-gray-300 px-2 py-4 rounded-md w-full"
    />
  );
};

export default FormInput;
