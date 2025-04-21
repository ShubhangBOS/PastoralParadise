import { useAppStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ListingPhotos = () => {
  const { imageListings } = useAppStore();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    console.log("imageListings", imageListings);
  }, [imageListings]);

  return (
    <div className="flex gap-5 flex-col">
      <div className="relative w-full h-[60vh]">
        <Image
          alt="listing"
          fill
          src={
            imageListings.length > 0
              ? `https://api.thepastoralparadise.com${imageListings[currentPhoto].imagePath}`
              : "/home/defaultFarmImage.jpg"
          }
        />
      </div>
      {imageListings.length > 1 && (
        <ul className="flex gap-5 flex-wrap">
          {imageListings.map((photo, index) => (
            <li
              key={photo.imageId}
              className="relative w-48 h-32 cursor-pointer"
              onClick={() => setCurrentPhoto(index)}
            >
              <Image
                src={`https://api.thepastoralparadise.com${photo.imagePath}`}
                fill
                alt="all photos"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingPhotos;
