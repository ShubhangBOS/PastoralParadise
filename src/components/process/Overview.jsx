import Image from "next/image";
import React from "react";

const Overview = () => {
  const mainTitle = "It’s easy to get started on Pastoral Paradise";
  const data = [
    {
      title: "Tell us about your place",
      description:
        "Share some basic info, such as where it is and how many guests can stay.",
      image: "/home/overview1.webp",
    },
    {
      title: "Make it stand out",
      description:
        "Add 5 or more photos plus a title and description – we’ll help you out.",
      image: "/home/overview2.webp",
    },
    {
      title: "Finish up and publish",
      description:
        "Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.",
      image: "/home/overview3.webp",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row h-full md:justify-between items-center px-5 md:px-10 lg:px-32 gap-5 md:gap-10 lg:gap-20 overflow-auto no-scrollbar">
      <div>
        <strong>
          <h1 className="text-5xl leading-normal text-pastoral-light-black">
            {mainTitle}
          </h1>
        </strong>
      </div>
      <ul className="flex flex-col gap-5 md:gap-16">
        {data.map(({ description, title, image }, index) => (
          <li
            key={title}
            className="flex items-start md:items-center flex-col sm:flex-row justify-start gap-6 "
          >
            <div className="flex gap-5">
              <strong className="text-2xl pt-5 text-pastoral-light-black">
                {index + 1}.
              </strong>
              <div className="pt-5">
                <strong className="text-2xl text-pastoral-light-black">
                  <h3>{title}</h3>
                </strong>
                <p className="text-pastoral-light-gray text-lg">
                  {description}
                </p>
              </div>
            </div>
            <div className="relative w-48 h-32 object-cover">
              <Image src={image} alt="overview" fill />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overview;
