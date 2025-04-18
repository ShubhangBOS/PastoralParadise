import React from "react";

const StepOneStarter = () => {
  return (
    <div className="flex items-center h-full mx-10 mt-10 md:mx-20 overflow-auto no-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-pastoral-light-black">
          <div className="text-2xl">Step 1</div>
          <h1 className="text-4xl">
            <strong>Tell us about your place</strong>
          </h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            sit culpa veritatis repellendus, quia accusantium reiciendis numquam
            neque. Tempore, debitis!
          </p>
        </div>
        <div>
          <video src="/home/home.mp4" autoPlay loop></video>
        </div>
      </div>
    </div>
  );
};

export default StepOneStarter;
