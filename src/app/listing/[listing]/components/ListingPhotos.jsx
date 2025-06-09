import { url } from "@/lib/http";
import { useAppStore } from "@/store/store";
import Image from "next/image";
import React, { useState } from "react";
import { X } from "lucide-react"; // Optional: for a close icon

const ListingPhotos = () => {
  const { imageListings } = useAppStore();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const currentImageSrc =
    imageListings.length > 0
      ? `${url}${imageListings[currentPhoto].imagePath}`
      : "/home/defaultFarmImage.jpg";

  return (
    <div className="flex gap-5 flex-col">
      {/* Main Image */}
      <div
        className="relative w-full h-[60vh] cursor-pointer"
        onClick={handleImageClick}
      >
        <Image
          alt="listing"
          fill
          src={currentImageSrc}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Thumbnail Gallery */}
      {imageListings.length > 1 && (
        <ul className="flex gap-5 flex-wrap">
          {imageListings.map((photo, index) => (
            <li
              key={photo.imageId}
              className="relative w-48 h-32 cursor-pointer"
              onClick={() => setCurrentPhoto(index)}
            >
              <Image
                src={`${url}${photo.imagePath}`}
                fill
                alt="thumbnail"
                className="object-cover rounded-md"
              />
            </li>
          ))}
        </ul>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[1000] flex justify-center items-center">
          <div className="relative w-[80%] h-[90vh]">
            <Image
              src={currentImageSrc}
              alt="fullscreen image"
              fill
              className="object-contain"
            />
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 -right-12 bg-white rounded-full p-1 shadow-lg cursor-pointer"
            >
              <X className="w-6 h-6 text-black hover:text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPhotos;
