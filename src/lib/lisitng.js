import { createUrl, post } from "./http";
import axios from "axios";
// import { data } from "autoprefixer";

export const createLisitngAPI = async (listingData) => {
  try {
    const response = await axios.post(
      createUrl("api/FarmHouseDetails/FarmHouse_Location_SpaceDetails"),
      {
        ...listingData,
      }
    );
    return response.data;
  } catch (err) {
    console.error("Could not create listing. Please try after sometime.");
    return null;
  }
};

export const getAllListings = async () => {
  // const query = qs.stringify({
  //   orderBy: { createdAt: "asc" },
  // });

  try {
    const result = await axios.get(
      createUrl(`api/FarmHouseDetails/List_FarmhouseAllDetail`)
    );
    return result.data;
  } catch (err) {
    console.error("Could not get listings");
    return [];
  }
};

export const getListing = async (listingId) => {
  try {
    const result = await axios.get(
      createUrl(`api/FarmHouseDetails/List_FarmhouseSingleDetail/${listingId}`)
    );
    return result.data;
  } catch (error) {
    console.error("Could not get listing");
  }
};

export const getListingImages = async(listingId) => {
  try{
    const payload = {listingId};
    const response = await post(
      createUrl("/api/FarmhouseImage/getFarmhouseImages"),
      payload
    )

    return response.data
  } catch(error) {
    console.error("Could not get listing")
  }
}

export const addListingPhotos = async ({ files, farmHouseCode }) => {
  try {
    const formData = new FormData();

    formData.append("ImageId", 0);
    formData.append("FarmHouseCode", farmHouseCode);
    formData.append("ImageCategory", "all photos");
    formData.append("ImagePath", "");
    formData.append("UpdateColumnName", "");
    formData.append("TaskType", "ins");

    files.forEach((file) => {
      formData.append("Images", file);
    });

    const response = await axios.post(
      createUrl("/api/FarmhouseImage/FarmHouseImagesUpload"),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Image upload error:", err);
    return null;
  }
};

export const getAllListingImages = async (farmHouseCode) => {
  try {
    const result = await post(
      createUrl("/api/FarmhouseImage/getFarmhouseImages"),
      farmHouseCode
    );
    return result.data?.data || [];
  } catch (err) {
    console.error("Error getting Images. Please try again later");
  }
};

export const createBookingAPI = async (bookingDetail) => {
  try {
    const response = await post(
      createUrl("/api/BookingDetails/BookingDetails"),
      bookingDetail
    );
    return response.data;
  } catch (err) {
    console.error("Could not create booking");
    return null;
  }
};


export const searchQueryAPI = async (
  searchbyState,
  searchbyFarmTitle,
  searchbyCheckin,
  searchbyCheckout
) => {
  try {
    const payload = {
      searchbyState,
      searchbyFarmTitle,
      searchbyCheckin,
      searchbyCheckout,
    };

    const response = await post(
      createUrl("/api/Search/SearchFarmhouse"),
      payload
    );

    return response.data;
  } catch (err) {
    alert("Could not perform search operation.");
    console.error(err);
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await post(
      createUrl("/api/Login/UpdateProfile"),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (err) {
    alert("Could not update profile.");
    console.error(err);
  }
};



export const getCheckInCheckouts = async (listingId) => {
  try {
    const response = await axios.get(
      createUrl(`/api/BookingDetails/CheckIn_Out?FarmhouseCode=${listingId}`)
    );
    return response.data;
  } catch (err) {
    console.error("could not get checkin and checkout dates");
    return null;
  }
};

export const deleteListingAPI = async (listingId) => {
  try {
    const response = await post(
      createUrl("/api/FarmHouseDetails/Delete_farmname_OtherDetails"),
      listingId
    );
    return response.data;
  } catch (err) {
    console.error("could not delete listing now, please try after sometime");
    return null;
  }
};

export const getTripsAPI = async (tripData) => {
  try {
    const response = await post(
      createUrl("/api/BookingDetails/Search_BookingStatus"),
      tripData
    );
    return response.data;
  } catch (err) {
    console.error("could not get trips, please try after sometime");
    return null;
  }
};

// export const getSearchListing = async (searchTerm) => {
//   const query = qs.stringify({
//     where: {
//       OR: [
//         {
//           locationData: {
//             path: ["place"],
//             string_contains: searchTerm,
//           },
//         },
//         {
//           locationData: {
//             path: ["region"],
//             string_contains: searchTerm,
//           },
//         },
//         {
//           locationData: {
//             path: ["country"],
//             string_contains: searchTerm,
//           },
//         },
//         {
//           locationData: {
//             path: ["district"],
//             string_contains: searchTerm,
//           },
//         },
//         {
//           locationData: {
//             path: ["landmark"],
//             string_contains: searchTerm,
//           },
//         },
//         {
//           locationData: {
//             path: ["locality"],
//             string_contains: searchTerm,
//           },
//         },
//         {
//           locationData: {
//             path: ["postcode"],
//             string_contains: searchTerm,
//           },
//         },
//         {
//           locationData: {
//             path: ["neighborhood"],
//             string_contains: searchTerm,
//           },
//         },
//       ],
//     },
//     orderBy: { createdAt: "asc" },
//   });
//   const result = await axios.get(createUrl(`/api/listings?${query}`));
//   if (!result) {
//     console.log("not found");
//   }

//   console.log({ result });
//   return result.data;
// };

// export const getUserListings = async (userId) => {
//   const query = qs.stringify({
//     where: { listingCreatedById: userId },
//   });
//   const result = await axios.get(createUrl(`/api/listings?${query}`));
//   if (!result) {
//     console.log("not found");
//   }
//   console.log({ result });
//   return result.data;
// };

// export const deleteListingAPI = async (id) => {
//   const result = await axios.delete(createUrl(`/api/listings/${id}`));
//   if (!result) {
//     console.log("cannot delete");
//   }
//   return result;
// };

// export const addToWishList = async (id, userId) => {
//   const query = {
//     listing: { id },
//     user: { id: userId },
//   };

//   const result = (
//     await post(createUrl("/api/wishlists"), {
//       ...query,
//     }).catch(() => null)
//   )?.data;

//   console.log({ result });

//   if (!result) {
//     return alert("Could not create task");
//   }

//   return result;
// };

// export const getUserWishlists = async (userId) => {
//   const query = qs.stringify({
//     where: {
//       user: { id: userId },
//     },
//     select: {
//       listing: true,
//     },
//   });
//   const result = (
//     await axios.get(createUrl(`/api/wishlists?${query}`)).catch(() => null)
//   )?.data;

//   console.log({ result });
//   return result;
// };

// export const removeFromWishListAPI = async (id) => {
//   const result = await axios.delete(createUrl(`/api/wishlists/${id}`));
//   if (!result) {
//     console.log("cannot delete");
//   }
//   return result;
// };

// export const addTrip = async (data) => {
//   const query = {
//     listing: {
//       id: data.listingId,
//     },
//     user: { id: data.userId },
//     tripData: data.tripData,
//   };
//   const result = await axios.post(createUrl("/api/trips"), { ...query });
//   if (!result) {
//     alert("failed");
//   } else {
//     return result;
//   }
// };

// export const getUserTrips = async (userId) => {
//   const query = qs.stringify({
//     where: {
//       user: { id: userId },
//     },
//     select: {
//       listing: true,
//     },
//   });
//   const result = (
//     await axios.get(createUrl(`/api/trips?${query}`)).catch(() => null)
//   )?.data;

//   console.log({ result });
//   return result;
// };
