import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";

const Title = ({ setIsValid }) => {
  const { farmName, setFarmName } = useAppStore();

  useEffect(() => {
    const valid = farmName?.trim() !== "";
    setIsValid(valid);
  }, [farmName, setIsValid]);
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full text-pastoral-light-black px-5 md:px-0">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-4xl">
          Now, Let's give your house a title
        </h2>
        <p>
          Short titles works best. Have fun with it - you can always change it
          later.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <textarea
          className="border border-gray-400 h-40 w-full md:w-[550px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl"
          value={farmName}
          required
          onChange={(e) => {
            if (e.target.value.length <= 32) {
              setFarmName(e.target.value);
            }
          }}
        />
        <span>{farmName.length}/32</span>
      </div>
    </div>
  );
};

export default Title;
