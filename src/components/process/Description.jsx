import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";

const Description = ({ setIsValid }) => {
  const { farmDescription, setFarmDescription } = useAppStore();
  useEffect(() => {
    const valid = farmDescription?.trim() !== "";
    setIsValid(valid);
  }, [farmDescription, setIsValid]);
  return (
    <div className="flex items-center justify-center h-full text-pastoral-light-black px-5 md:px-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl">Create your descripton</h2>
          <p>Share what makes your place special</p>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="border border-gray-400 h-56 w-full md:w-[550px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl"
            value={farmDescription}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setFarmDescription(e.target.value);
              }
            }}
          />
          <span>{farmDescription.length}/500</span>
        </div>
      </div>
    </div>
  );
};

export default Description;
