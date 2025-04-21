import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/store";
import { addListingPhotos } from "@/lib/lisitng";

const Photos = () => {
  const { createNewListing } = useAppStore();
  const [uploading, setUploading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList); // convert FileList to Array

    const unsupported = files.filter((file) =>
      file.name.toLowerCase().endsWith(".avif")
    );

    if (unsupported.length > 0) {
      alert(
        "AVIF files are not supported. Please upload JPG, PNG, or WEBP images."
      );
      return;
    }

    if (!createNewListing?.farmHouseCode) {
      alert("FarmHouseCode is missing.");
      return;
    }

    try {
      setUploading(true);

      const result = await addListingPhotos({
        files,
        farmHouseCode: createNewListing.farmHouseCode,
      });

      if (result?.status && Array.isArray(result.data)) {
        const newImages = result.data.map((img) => img.imagePath);
        setUploadedPhotos((prev) => [...prev, ...newImages]);
      } else {
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="flex gap-5 items-center justify-center flex-col h-full">
      <h2 className="font-semibold text-4xl">
        Add some photos of your farmhouse
      </h2>
      <p>
        You’ll need 5 photos to get started. You can add more or make changes
        later.
      </p>

      <label className="bg-pastoral-gradient py-3 mt-5 px-5 text-white text-base font-medium rounded-md cursor-pointer">
        {uploading ? "Uploading..." : "Upload"}
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      <div className="grid grid-cols-3 gap-4 h-[55vh] overflow-auto pb-10 no-scrollbar">
        {uploadedPhotos.map((photo, index) => (
          <div className="relative h-36 w-[200px]" key={index}>
            <Image
              src={`https://api.thepastoralparadise.com${photo}`}
              fill
              alt={`upload-${index}`}
              className="object-cover rounded"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
