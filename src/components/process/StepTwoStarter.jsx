import React from "react";

const StepTwoStarter = () => {
  return (
    <div className="flex items-center h-full mx-20 ">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-pastoral-light-black">
          <div className="text-2xl">Step 2</div>
          <h1 className="text-4xl">
            <strong>Make your place standout</strong>
          </h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            sit culpa veritatis repellendus, quia accusantium reiciendis numquam
            neque. Tempore, debitis!
          </p>
        </div>
        <div>
          <video src="/home/home2.mp4" autoPlay loop></video>
        </div>
      </div>
    </div>
  );
};

export default StepTwoStarter;
