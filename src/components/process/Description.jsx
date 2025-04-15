import { useAppStore } from "@/store/store";
import React from "react";

const Description = () => {
  const { farm_Description, setFarmDescription } =
    useAppStore();
  return (
    <div className="flex items-center justify-center h-full text-pastoral-light-black">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl">Create your descripton</h2>
          <p>Share what makes your place special</p>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="border border-gray-400 h-56 w-[550px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl"
            value={farm_Description}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setFarmDescription(e.target.value);
              }
            }}
          />
          <span>{farm_Description.length}/500</span>
        </div>
      </div>
    </div>
  );
};

export default Description;
